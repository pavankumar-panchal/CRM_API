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