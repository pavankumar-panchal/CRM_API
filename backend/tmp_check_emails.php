<?php
$servername = "127.0.0.1";
$username = "root";
$password = "";
$dbname = "CRM_API";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    echo json_encode(["error"=>"conn failed", "msg"=>$conn->connect_error]);
    exit(0);
}
$conn->set_charset('utf8mb4');

$queries = [
    'total' => "SELECT COUNT(*) as cnt FROM emails",
    'to_process' => "SELECT COUNT(*) as cnt FROM emails WHERE domain_verified=1 AND domain_processed=0",
    'domain_verified_process' => "SELECT COUNT(*) as cnt FROM emails WHERE domain_verified=1 AND domain_processed=0",
    'sample' => "SELECT id, raw_emailid, sp_domain, domain_verified, domain_status, domain_processed, worker_id FROM emails ORDER BY id DESC LIMIT 10",
    'to_claim_sample' => "SELECT id, raw_emailid, sp_domain, domain_verified, domain_status, domain_processed, worker_id FROM emails WHERE domain_verified=1 AND domain_processed=0 LIMIT 20"
];
$out = [];
foreach ($queries as $k => $sql) {
    $res = $conn->query($sql);
    if (!$res) { $out[$k] = ['error'=>$conn->error]; continue; }
    if ($k === 'sample' || $k === 'to_claim_sample') {
        $rows = [];
        while ($r = $res->fetch_assoc()) $rows[] = $r;
        $out[$k] = $rows;
    } else {
        $out[$k] = (int)($res->fetch_assoc()['cnt'] ?? 0);
    }
}
echo json_encode($out, JSON_PRETTY_PRINT);
$conn->close();
