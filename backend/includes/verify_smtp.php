<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
set_time_limit(0);

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");

// Database configuration
$servername = "127.0.0.1";
$username = "root"; 
$password = "";
$dbname = "CRM_API";

// Create main connection
$conn = new mysqli($servername, $username, $password, $dbname);
$conn->set_charset("utf8mb4");
if ($conn->connect_error) {
    die(json_encode(["status" => "error", "message" => "Connection failed: " . $conn->connect_error]));
}

// Separate log DB credentials
$log_db_host = "127.0.0.1";
$log_db_user = "root";
$log_db_pass = "";
$log_db_name = "CRM_logs";

$conn_logs = new mysqli($log_db_host, $log_db_user, $log_db_pass, $log_db_name);
$conn_logs->set_charset("utf8mb4");
if ($conn_logs->connect_error) {
    die(json_encode(["status" => "error", "message" => "Log DB connection failed: " . $conn_logs->connect_error]));
}

// Configuration - tune these for your server capacity
define('MAX_WORKERS', 50);          // maximum parallel worker processes
define('EMAILS_PER_WORKER', 200);   // how many emails a worker will claim at once
define('WORKER_SCRIPT', __DIR__ . '/smtp_worker2.php');
define('LOG_FILE', __DIR__ . '/../storage/smtp_parallel.log');

set_time_limit(0);
ini_set('memory_limit', '2048M');

// Create worker script if not exists. The worker will accept a worker id argument and
// process rows where emails.worker_id = WORKER_ID and domain_processed = 0
if (!file_exists(WORKER_SCRIPT)) {
    $worker_code = <<<'EOC'
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
EOC;
    file_put_contents(WORKER_SCRIPT, $worker_code);
}

// --- Logging ---
function write_log($msg)
{
    $ts = date('Y-m-d H:i:s');
    file_put_contents(LOG_FILE, "[$ts] $msg\n", FILE_APPEND);
}

// --- Get all email IDs to process ---
function get_all_email_ids($conn)
{
    $ids = [];
    $result = $conn->query("SELECT id FROM emails WHERE domain_verified=1 AND domain_processed=0");
    while ($row = $result->fetch_assoc()) {
        $ids[] = $row['id'];
    }
    return $ids;
}

// --- Split IDs into N workers ---
function split_ids($ids, $num_workers)
{
    $total = count($ids);

    // Prevent divide-by-zero or invalid chunking
    if ($total === 0 || $num_workers <= 0) {
        return [];  // Nothing to process
    }

    $chunk_size = ceil($total / $num_workers);
    if ($chunk_size <= 0) {
        return [$ids]; // fallback (shouldn’t happen)
    }

    return array_chunk($ids, $chunk_size);
}


// --- Parallel SMTP processing ---
function process_in_parallel($conn)
{
    // Claim rows by updating worker_id in small chunks, then spawn workers with just the worker id.
    $result = $conn->query("SELECT COUNT(*) as cnt FROM emails WHERE domain_verified=1 AND domain_processed=0");
    $totalToProcess = (int) ($result->fetch_assoc()['cnt'] ?? 0);
    if ($totalToProcess === 0) {
        write_log("No emails found to process.");
        return 0;
    }

    $num_workers = (int) min(MAX_WORKERS, max(1, ceil($totalToProcess / EMAILS_PER_WORKER)));
    $active_procs = [];
    $assigned = 0;

    write_log("Starting parallel SMTP processing: total={$totalToProcess}, target_workers={$num_workers}, chunk=" . EMAILS_PER_WORKER);

    // 1) If there are already claimed worker_ids (from previous run), include them first
    $existingWids = [];
    $resW = $conn->query("SELECT DISTINCT worker_id FROM emails WHERE domain_verified=1 AND domain_processed=0 AND worker_id IS NOT NULL AND worker_id > 0");
    while ($r = $resW->fetch_assoc()) {
        $existingWids[] = (int)$r['worker_id'];
    }

    $usedWids = $existingWids;
    $nextWid = count($existingWids) ? max($existingWids) + 1 : 1;

    // Claim new chunks until we have up to $num_workers distinct worker ids
    while (count($usedWids) < $num_workers) {
        $claimWid = $nextWid;
        $claimSql = sprintf(
            "UPDATE emails SET worker_id = %d WHERE domain_verified = 1 AND domain_processed = 0 AND (worker_id IS NULL OR worker_id = 0) LIMIT %d",
            $claimWid,
            EMAILS_PER_WORKER
        );
        $conn->query($claimSql);
        $affected = $conn->affected_rows;
        if ($affected > 0) {
            $usedWids[] = $claimWid;
            $assigned += $affected;
            write_log("Claimed $affected rows for new worker $claimWid");
        }
        $nextWid++;
        // Safety: break if nextWid skyrockets
        if ($nextWid > 1000000) break;
        // If nothing was claimed for several iterations, break to avoid infinite loop
        if ($nextWid - (count($existingWids) ? max($existingWids) : 0) > $num_workers * 5) break;
        // Check if no more rows remain
        $r = $conn->query("SELECT COUNT(*) as cnt FROM emails WHERE domain_verified=1 AND domain_processed=0");
        $remaining = (int)($r->fetch_assoc()['cnt'] ?? 0);
        if ($remaining <= 0) break;
    }

    // Spawn workers for each used worker id
    foreach ($usedWids as $wid) {
        // compute approx count for logging
        $cntR = $conn->query("SELECT COUNT(*) as cnt FROM emails WHERE worker_id = " . intval($wid) . " AND domain_processed = 0");
        $cnt = (int)($cntR->fetch_assoc()['cnt'] ?? 0);
        if ($cnt <= 0) continue;
        $cmd = "php " . escapeshellarg(WORKER_SCRIPT) . " " . intval($wid);
        $descriptorspec = [0 => ["pipe", "r"], 1 => ["pipe", "w"], 2 => ["pipe", "w"]];
        $proc = proc_open($cmd, $descriptorspec, $pipes);
        if (is_resource($proc)) {
            $active_procs[] = [
                'proc' => $proc,
                'pipes' => $pipes,
                'worker_id' => $wid,
                'count' => $cnt
            ];
            write_log("Started worker $wid for $cnt emails");
        }
    }

    // Wait for all workers to finish
    foreach ($active_procs as $worker) {
        $status = proc_get_status($worker['proc']);
        while ($status['running']) {
            usleep(100000);
            $status = proc_get_status($worker['proc']);
        }
        $stdout = stream_get_contents($worker['pipes'][1]);
        $stderr = stream_get_contents($worker['pipes'][2]);
        if (trim($stdout)) write_log("Worker {$worker['worker_id']} OUTPUT: $stdout");
        if (trim($stderr)) write_log("Worker {$worker['worker_id']} ERROR: $stderr");
        foreach ($worker['pipes'] as $pipe) fclose($pipe);
        proc_close($worker['proc']);
    }

    // Log how many emails remain to process
    $result = $conn->query("SELECT COUNT(*) as remaining FROM emails WHERE validation_status IS NULL");
    $row = $result->fetch_assoc();
    $remaining = $row ? $row['remaining'] : 0;
    write_log("Processing complete. Remaining unprocessed emails: $remaining");

    return $assigned;
}

// --- Main execution ---
try {
    // Update status before processing
    $conn->query("UPDATE csv_list SET status = 'running' WHERE status = 'pending'");

    // Check if there are emails to process (domain_verified indicates domain step passed)
    $result = $conn->query("SELECT COUNT(*) as cnt FROM emails WHERE domain_verified=1 AND domain_processed=0");
    $row = $result->fetch_assoc();
    if ($row['cnt'] == 0) {
        // No emails currently eligible for SMTP processing.
        // Don't mark the csv_list as completed here because domain verification
        // may still be in progress. Only mark completed after SMTP finishes
        // and we confirm there are no pending domain verifications.
        $pending_domain = (int)($conn->query("SELECT COUNT(*) as cnt FROM emails WHERE domain_verified = 0 AND domain_processed = 0")->fetch_assoc()['cnt'] ?? 0);
        if ($pending_domain > 0) {
            echo json_encode([
                "status" => "pending",
                "processed" => 0,
                "message" => "Domain verification not completed yet. SMTP will run after domains are verified.",
                "pending_domain_count" => $pending_domain
            ]);
            $conn->close();
            $conn_logs->close();
            exit;
        } else {
            // No pending domain verifications; safe to mark completed
            $conn->query("UPDATE csv_list SET status = 'completed' WHERE status = 'running'");
            echo json_encode([
                "status"  => "success",
                "processed" => 0,
                "message" => "No emails found to process. Marked csv_list as completed."
            ]);
            $conn->close();
            $conn_logs->close();
            exit;
        }
    }

    $start_time = microtime(true);
    $processed = process_in_parallel($conn);
    $total_time = microtime(true) - $start_time;

    // Check if all emails are processed (domain_processed=1 and domain_status in (1,2))
    $check = $conn->query("SELECT COUNT(*) as cnt FROM emails WHERE (domain_processed != 1 OR (domain_status NOT IN (1,2)))");
    $row = $check->fetch_assoc();
    if ($row['cnt'] == 0) {
        // All processed and valid/retryable, mark csv_list as completed
        $conn->query("UPDATE csv_list SET status = 'completed' WHERE status = 'running'");
    }

    // Get verification stats
    $total    = $conn->query("SELECT COUNT(*) as total FROM emails")->fetch_row()[0];
    $verified = $conn->query("SELECT COUNT(*) as valid FROM emails WHERE domain_status = 1")->fetch_row()[0];
    $invalid  = $conn->query("SELECT COUNT(*) as invalid FROM emails WHERE domain_status = 0")->fetch_row()[0];

    // Update csv_list with valid and invalid counts (safe, as values are integers)
    $conn->query("UPDATE csv_list SET valid_count = $verified, invalid_count = $invalid WHERE status IN ('running', 'completed')");
   
    update_all_csv_list_stats($conn);

    echo json_encode([
        "status"           => "success",
        "processed"        => (int) $processed,
        "total_emails"     => (int) $total,
        "verified_emails"  => (int) $verified,
        "invalid_emails"   => (int) $invalid,
        "time_seconds"     => round($total_time, 2),
        "rate_per_second"  => $total_time > 0 ? round($processed / $total_time, 2) : 0,
        "message"          => "Parallel SMTP processing completed"
    ]);
} catch (Exception $e) {
    echo json_encode([
        "status"  => "error",
        "message" => $e->getMessage()
    ]);
} finally {
    $conn->close();
    $conn_logs->close();
}

function update_all_csv_list_stats($conn) {
    $bulkUpdateSql = "
        UPDATE csv_list cl
        JOIN (
          SELECT 
            csv_list_id,
            SUM(CASE WHEN domain_status = 1 THEN 1 ELSE 0 END) AS valid_count,
            SUM(CASE WHEN domain_status = 0 THEN 1 ELSE 0 END) AS invalid_count,
            COUNT(*) AS total_emails
          FROM emails
          WHERE domain_status IN (0, 1)
          GROUP BY csv_list_id
        ) e ON e.csv_list_id = cl.id
        SET 
          cl.valid_count = e.valid_count,
          cl.invalid_count = e.invalid_count,
          cl.total_emails = e.total_emails
    ";
    $conn->query($bulkUpdateSql);
}
