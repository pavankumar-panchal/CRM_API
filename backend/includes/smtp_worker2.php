<?php
$servername = "127.0.0.1";
$username = "root";
$password = "";
$dbname = "CRM_API";

$conn = new mysqli($servername, $username, $password, $dbname);
$conn->set_charset("utf8mb4");
if ($conn->connect_error) exit(1);

$log_db_host = "127.0.0.1";
$log_db_user = "root";
$log_db_pass = "";
$log_db_name = "CRM_logs";

$conn_logs = new mysqli($log_db_host, $log_db_user, $log_db_pass, $log_db_name);
$conn_logs->set_charset("utf8mb4");
if ($conn_logs->connect_error) exit(1);

if (!isset($argv[1])) exit(0);
$worker_id = intval($argv[1]);
if ($worker_id <= 0) exit(0);

define('CHUNK_SIZE', 200);

// Helper functions
function insert_smtp_log_worker($conn_logs, $email, $steps, $validation, $validation_response) {
    $stmt = $conn_logs->prepare("INSERT INTO email_smtp_checks2 
        (email, smtp_connection, ehlo, mail_from, rcpt_to, validation, validation_response) 
        VALUES (?, ?, ?, ?, ?, ?, ?)");
    if ($stmt) {
        $stmt->bind_param(
            "sssssss",
            $email,
            $steps['smtp_connection'],
            $steps['ehlo'],
            $steps['mail_from'],
            $steps['rcpt_to'],
            $validation,
            $validation_response
        );
        $stmt->execute();
        $stmt->close();
    }
}

function verifyEmailViaSMTP_worker($email, $domain, $conn_logs) {
    $ip = false;
    $mxHost = null;
    $steps = [
        'smtp_connection' => 'No',
        'ehlo' => 'No',
        'mail_from' => 'No',
        'rcpt_to' => 'No'
    ];

    if (getmxrr($domain, $mxhosts) && !empty($mxhosts)) {
        $mxIp = @gethostbyname($mxhosts[0]);
        if ($mxIp !== $mxhosts[0] && filter_var($mxIp, FILTER_VALIDATE_IP)) {
            $ip = $mxIp;
            $mxHost = $mxhosts[0];
        }
    }
    if (!$ip) {
        $aRecord = @gethostbyname($domain);
        if ($aRecord !== $domain && filter_var($aRecord, FILTER_VALIDATE_IP)) {
            $ip = $aRecord;
            $mxHost = $domain;
        }
    }
    if (!$ip) {
        insert_smtp_log_worker($conn_logs, $email, $steps, "No valid MX or A record found", "No valid MX or A record found");
        return [
            "status" => "invalid",
            "domain_status" => 0,
            "validation_status" => "invalid",
            "validation_response" => "No valid MX or A record found"
        ];
    }

    $port = 25;
    $timeout = 8; // shorter timeout for speed
    $smtp = @stream_socket_client("tcp://$ip:$port", $errno, $errstr, $timeout);
    if (!$smtp) {
        insert_smtp_log_worker($conn_logs, $email, $steps, "Connection failed: $errstr", "Connection failed: $errstr");
        return [
            "status" => "invalid",
            "domain_status" => 0,
            "validation_status" => "invalid",
            "validation_response" => "Connection failed: $errstr"
        ];
    }
    $steps['smtp_connection'] = 'Yes';
    stream_set_timeout($smtp, $timeout);
    $response = fgets($smtp, 4096);
    if ($response === false || substr($response, 0, 3) != "220") {
        fclose($smtp);
        insert_smtp_log_worker($conn_logs, $email, $steps, "SMTP server not ready or no response", "SMTP server not ready or no response");
        return [
            "status" => "invalid",
            "domain_status" => 0,
            "validation_status" => "invalid",
            "validation_response" => "SMTP server not ready or no response"
        ];
    }
    fputs($smtp, "EHLO local.test\r\n");
    $ehlo_ok = false;
    while ($line = fgets($smtp, 4096)) {
        if (substr($line, 3, 1) == " ") {
            $ehlo_ok = true;
            break;
        }
    }
    if (!$ehlo_ok) {
        fclose($smtp);
        $steps['ehlo'] = 'No';
        insert_smtp_log_worker($conn_logs, $email, $steps, "EHLO failed", "EHLO failed");
        return [
            "status" => "invalid",
            "domain_status" => 0,
            "validation_status" => "invalid",
            "validation_response" => "EHLO failed"
        ];
    }
    $steps['ehlo'] = 'Yes';
    fputs($smtp, "MAIL FROM:<info@local.test>\r\n");
    $mailfrom_resp = fgets($smtp, 4096);
    if ($mailfrom_resp === false) {
        fclose($smtp);
        $steps['mail_from'] = 'No';
        insert_smtp_log_worker($conn_logs, $email, $steps, "MAIL FROM failed", "MAIL FROM failed");
        return [
            "status" => "invalid",
            "domain_status" => 0,
            "validation_status" => "invalid",
            "validation_response" => "MAIL FROM failed"
        ];
    }
    $steps['mail_from'] = 'Yes';
    fputs($smtp, "RCPT TO:<$email>\r\n");
    $rcpt_resp = fgets($smtp, 4096);
    $responseCode = $rcpt_resp !== false ? substr($rcpt_resp, 0, 3) : null;
    $steps['rcpt_to'] = ($responseCode == "250" || $responseCode == "251") ? 'Yes' : 'No';
    fputs($smtp, "QUIT\r\n");
    fclose($smtp);

    $validation_response = $rcpt_resp !== false ? $rcpt_resp : '';
    $validation_response = substr($validation_response, 0, 1000);

    if ($responseCode == "250" || $responseCode == "251") {
        insert_smtp_log_worker($conn_logs, $email, $steps, $ip, $validation_response);
        return ["status"=>"valid","domain_status"=>1,"validation_status"=>"valid","validation_response"=>$ip];
    } elseif (in_array($responseCode, ["450", "451", "452"])) {
        insert_smtp_log_worker($conn_logs, $email, $steps, $rcpt_resp, $validation_response);
        return ["status"=>"retryable","domain_status"=>2,"validation_status"=>"retryable","validation_response"=>$rcpt_resp];
    } else {
        insert_smtp_log_worker($conn_logs, $email, $steps, $rcpt_resp, $validation_response);
        return ["status"=>"invalid","domain_status"=>0,"validation_status"=>"invalid","validation_response"=>$rcpt_resp];
    }
}

// Claim and process rows assigned to this worker
$claimStmt = $conn->prepare("SELECT id, raw_emailid, sp_domain FROM emails WHERE worker_id = ? AND domain_processed = 0 LIMIT ?");
$updateStmt = $conn->prepare("UPDATE emails SET domain_status = ?, domain_processed = 1, validation_status = ?, validation_response = ? WHERE id = ?");
if (!$claimStmt || !$updateStmt) exit(0);

$claimStmt->bind_param('ii', $worker_id, $limit);

$limit = CHUNK_SIZE;
$claimStmt->execute();
$res = $claimStmt->get_result();
while ($row = $res->fetch_assoc()) {
    $email_id = (int)$row['id'];
    $email = $row['raw_emailid'];
    $domain = $row['sp_domain'];
    $verify = verifyEmailViaSMTP_worker($email, $domain, $conn_logs);
    $vs = mb_convert_encoding($verify['validation_response'] ?? '', 'UTF-8', 'UTF-8');
    $vs = mb_substr($vs, 0, 1000, 'UTF-8');
    $updateStmt->bind_param('issi', $verify['domain_status'], $verify['validation_status'], $vs, $email_id);
    $updateStmt->execute();
}

$claimStmt->close();
$updateStmt->close();
$conn->close();
$conn_logs->close();
exit(0);