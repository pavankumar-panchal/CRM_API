<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");

$servername = "127.0.0.1";
$username = "root";
$password = "";
$dbname = "CRM_API";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die(json_encode(["status" => "error", "message" => "Connection failed: " . $conn->connect_error]));
}

// Configuration
define('MAX_WORKERS', 100);
define('DOMAINS_PER_WORKER', 1000);
define('WORKER_SCRIPT', __DIR__ . '/domain_worker.php');

set_time_limit(0);
ini_set('memory_limit', '512M');

if (!file_exists(WORKER_SCRIPT)) {
    $worker_code = <<<'PHP'
<?php
// Domain worker: resolve MX and A/AAAA records robustly and update emails table
$conn = new mysqli("127.0.0.1", "root", "", "CRM_API");
if ($conn->connect_error) exit(1);

$start_id = isset($argv[1]) ? (int)$argv[1] : 0;
$end_id   = isset($argv[2]) ? (int)$argv[2] : 0;

$stmt = $conn->prepare("SELECT id, sp_domain FROM emails WHERE id BETWEEN ? AND ? AND domain_verified = 0");
$stmt->bind_param("ii", $start_id, $end_id);
$stmt->execute();
$res = $stmt->get_result();

function try_resolve_domain($domain) {
    // Try MX records first
    $ips = [];
    $mx = @dns_get_record($domain, DNS_MX);
    if ($mx && is_array($mx)) {
        // sort by preference
        usort($mx, function($a, $b){ return ($a['pri'] ?? 0) - ($b['pri'] ?? 0); });
        foreach ($mx as $m) {
            $host = $m['target'] ?? null;
            if (!$host) continue;
            // get A and AAAA records for the MX host
            $arec = @dns_get_record($host, DNS_A + DNS_AAAA);
            if ($arec && is_array($arec)) {
                foreach ($arec as $r) {
                    if (!empty($r['ip']) && filter_var($r['ip'], FILTER_VALIDATE_IP)) $ips[] = $r['ip'];
                    if (!empty($r['ipv6']) && filter_var($r['ipv6'], FILTER_VALIDATE_IP)) $ips[] = $r['ipv6'];
                }
            } else {
                // fallback to system resolver
                $h = @gethostbyname($host);
                if ($h && $h !== $host && filter_var($h, FILTER_VALIDATE_IP)) $ips[] = $h;
            }
            if (!empty($ips)) break; // stop after first working MX
        }
    }

    // Fallback to A/AAAA for the domain itself
    if (empty($ips)) {
        $arec = @dns_get_record($domain, DNS_A + DNS_AAAA);
        if ($arec && is_array($arec)) {
            foreach ($arec as $r) {
                if (!empty($r['ip']) && filter_var($r['ip'], FILTER_VALIDATE_IP)) $ips[] = $r['ip'];
                if (!empty($r['ipv6']) && filter_var($r['ipv6'], FILTER_VALIDATE_IP)) $ips[] = $r['ipv6'];
            }
        } else {
            $h = @gethostbyname($domain);
            if ($h && $h !== $domain && filter_var($h, FILTER_VALIDATE_IP)) $ips[] = $h;
        }
    }

    return $ips; // may be empty
}

while ($row = $res->fetch_assoc()) {
    $domain = trim($row['sp_domain']);
    $ips = try_resolve_domain($domain);
    $status = empty($ips) ? 0 : 1;
    $response = $status ? $ips[0] : 'No MX/A records';

    $update = $conn->prepare("UPDATE emails SET domain_verified = 1, domain_status = ?, validation_response = ? WHERE id = ?");
    if ($update) {
        $update->bind_param("isi", $status, $response, $row['id']);
        $update->execute();
        $update->close();
    }
}

$conn->close();
PHP;

    file_put_contents(WORKER_SCRIPT, $worker_code);
}

function get_id_ranges($conn, $batch_size)
{
    $ranges = [];
    $result = $conn->query("SELECT MIN(id) as min_id, MAX(id) as max_id FROM emails WHERE domain_verified = 0");
    $row = $result->fetch_assoc();
    if (!$row || $row['min_id'] === null || $row['max_id'] === null)
        return $ranges;

    for ($i = $row['min_id']; $i <= $row['max_id']; $i += $batch_size) {
        $end = min($i + $batch_size - 1, $row['max_id']);
        $ranges[] = ['start' => $i, 'end' => $end];
    }
    return $ranges;
}

function process_in_parallel($conn)
{
    $batch_size = DOMAINS_PER_WORKER;
    $ranges = get_id_ranges($conn, $batch_size);
    $processed = 0;
    $active_procs = [];
    $batch_idx = 0;

    while ($batch_idx < count($ranges) || count($active_procs) > 0) {
        while (count($active_procs) < MAX_WORKERS && $batch_idx < count($ranges)) {
            $range = $ranges[$batch_idx];
            $cmd = "php " . escapeshellarg(WORKER_SCRIPT) . " {$range['start']} {$range['end']}";
            $descriptorspec = [0 => ["pipe", "r"], 1 => ["pipe", "w"], 2 => ["pipe", "w"]];
            $proc = proc_open($cmd, $descriptorspec, $pipes);
            if (is_resource($proc)) {
                $active_procs[] = ['proc' => $proc, 'pipes' => $pipes];
                $processed += ($range['end'] - $range['start'] + 1);
            }
            $batch_idx++;
        }

        foreach ($active_procs as $key => $worker) {
            $status = proc_get_status($worker['proc']);
            if (!$status['running']) {
                foreach ($worker['pipes'] as $pipe)
                    fclose($pipe);
                proc_close($worker['proc']);
                unset($active_procs[$key]);
            }
        }

        usleep(100000);
        $active_procs = array_values($active_procs);
    }

    return $processed;
}

try {
    $conn->query("UPDATE csv_list SET status = 'running' WHERE status = 'pending'");

    $start_time = microtime(true);
    $processed = process_in_parallel($conn);
    $total_time = microtime(true) - $start_time;

    $total = $conn->query("SELECT COUNT(*) FROM emails")->fetch_row()[0];
    $verified = $conn->query("SELECT COUNT(*) FROM emails WHERE domain_verified = 1")->fetch_row()[0];

    echo json_encode([
        "status" => "success",
        "processed" => (int) $processed,
        "total_domains" => (int) $total,
        "verified_domains" => (int) $verified,
        "time_seconds" => round($total_time, 2),
        "rate_per_second" => round($processed / $total_time, 2),
        "message" => "Parallel processing completed"
    ]);

} catch (Exception $e) {
    echo json_encode([
        "status" => "error",
        "message" => $e->getMessage()
    ]);
} finally {
    $conn->close();
}