<?php
require_once __DIR__ . '/../config/jwt.php';

// CORS: reflect allowed Origin, allow credentials and preflight
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$allowedOrigins = [
    'http://localhost',
    'http://127.0.0.1',
    'http://localhost:3000',
    'http://localhost:5173',
    'http://localhost:8080',
];
if ($origin && in_array($origin, $allowedOrigins, true)) {
    header("Access-Control-Allow-Origin: $origin");
    header('Vary: Origin');
    header('Access-Control-Allow-Credentials: true');
} else {
    header('Access-Control-Allow-Origin: *');
}

header('Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, X-Requested-With, Authorization, Accept');
header('Access-Control-Expose-Headers: Authorization');
header('Access-Control-Max-Age: 600');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit; }

header('Content-Type: application/json');

// Check JWT for logged-in user
$jwtData = decode_jwt_from_header();
if (!$jwtData) {
    echo json_encode([
        "status" => "error",
        "message" => "Not authenticated",
    ]);
    exit;
}

$user_id = intval($jwtData->id ?? 0);

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

ini_set('memory_limit', '1024M');
ini_set('max_execution_time', 300);

// Ensure REQUEST_METHOD is set for CLI runs
if (!isset($_SERVER['REQUEST_METHOD'])) {
    $_SERVER['REQUEST_METHOD'] = php_sapi_name() === 'cli' ? 'CLI' : 'GET';
}

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once __DIR__ . '/../config/db.php';

// --- DELETE EMAIL BY ID ---
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    parse_str(file_get_contents("php://input"), $deleteVars);
    $id = isset($deleteVars['id']) ? intval($deleteVars['id']) : 0;
    if ($id > 0) {
        // Only delete if email belongs to this user
        $stmt = $conn->prepare("DELETE FROM emails WHERE id = ? AND user_id = ?");
        $stmt->bind_param("ii", $id, $user_id);
        $success = $stmt->execute();
        $stmt->close();
        echo json_encode([
            "success" => $success,
            "message" => $success ? "Email deleted." : "Delete failed."
        ]);
    } else {
        echo json_encode([
            "success" => false,
            "message" => "Invalid ID."
        ]);
    }
    exit;
}

// --- EXPORT CSV (STREAMING, FILTERED) ---
if (isset($_GET['export'])) {
    $type = $_GET['export'];
    $csv_list_id = isset($_GET['csv_list_id']) ? intval($_GET['csv_list_id']) : 0;
    $where = ["user_id = $user_id"];
    $filename = $type . '_emails.csv';

    if ($type === 'valid') {
        $where[] = "domain_status = 1";
    } elseif ($type === 'invalid') {
        $where[] = "domain_status = 0";
    } elseif ($type === 'connection_timeout') {
        $where[] = "(validation_response LIKE '%timeout%' OR validation_response LIKE '%Connection refused%')";
        $filename = 'connection_timeout_emails.csv';
    }

    if ($csv_list_id > 0) {
        $where[] = "csv_list_id = $csv_list_id";
    }
    $whereSql = count($where) ? "WHERE " . implode(" AND ", $where) : "";

    // Stream CSV output (no memory build-up)
    header('Content-Type: text/csv');
    header('Content-Disposition: attachment; filename="' . $filename . '"');
    $sql = "SELECT id, raw_emailid AS email FROM emails $whereSql ORDER BY id ASC";
    $result = $conn->query($sql);

    $out = fopen('php://output', 'w');
    // Write CSV header
    fputcsv($out, ["EMAIL"]);
    if ($result) {
        while ($row = $result->fetch_assoc()) {
            fputcsv($out, [$row['email']]);
        }
    }
    fclose($out);
    exit;
}

// --- RETRY FAILED (PAGINATED) ---
if (isset($_GET['retry_failed']) && $_GET['retry_failed'] == '1') {
    $page = isset($_GET['page']) ? max(1, intval($_GET['page'])) : 1;
    $limit = isset($_GET['limit']) ? max(1, intval($_GET['limit'])) : 100;
    $offset = ($page - 1) * $limit;
    $csv_list_id = isset($_GET['csv_list_id']) ? intval($_GET['csv_list_id']) : 0;

    $where = ["domain_status = 2", "user_id = $user_id"];
    if ($csv_list_id > 0) $where[] = "csv_list_id = $csv_list_id";
    $whereSql = "WHERE " . implode(" AND ", $where);

    $sql = "SELECT id, raw_emailid AS email, sp_account, sp_domain, domain_verified, domain_status, validation_response 
            FROM emails $whereSql ORDER BY id ASC LIMIT $limit OFFSET $offset";
    $countSql = "SELECT COUNT(*) as cnt FROM emails $whereSql";
    $result = $conn->query($sql);
    $countResult = $conn->query($countSql);
    $total = $countResult ? (int) $countResult->fetch_assoc()['cnt'] : 0;

    $emails = [];
    if ($result) {
        while ($row = $result->fetch_assoc()) {
            $row['domain_verified'] = (bool) $row['domain_verified'];
            $row['domain_status'] = (int) $row['domain_status'];
            $emails[] = $row;
        }
    }

    echo json_encode([
        "status" => "success",
        "message" => "Success",
        "data" => $emails,
        "total" => $total,
        "page" => $page,
        "limit" => $limit,
    ]);
    exit;
}

// --- PAGINATED EMAIL LIST (STRICT, SAFE FOR 2 CRORE DATA) ---
$page = isset($_GET['page']) ? max(1, intval($_GET['page'])) : 1;
$limit = isset($_GET['limit']) ? max(1, intval($_GET['limit'])) : 100;
$offset = ($page - 1) * $limit;

$csv_list_id = isset($_GET['csv_list_id']) ? intval($_GET['csv_list_id']) : 0;
$filter = isset($_GET['filter']) ? $_GET['filter'] : '';
$whereParts = ["user_id = ?"];
$params = [$user_id];
$types = 'i';

if ($csv_list_id > 0) {
    $whereParts[] = "csv_list_id = ?";
    $params[] = $csv_list_id;
    $types .= 'i';
}
if ($filter !== '') {
    if ($filter === 'valid') {
        $whereParts[] = "domain_status = ?";
        $params[] = 1;
        $types .= 'i';
    }
    if ($filter === 'invalid') {
        $whereParts[] = "domain_status = ?";
        $params[] = 0;
        $types .= 'i';
    }
    if ($filter === 'timeout') {
        $whereParts[] = "(validation_response LIKE ? OR validation_response LIKE ? OR validation_response LIKE ?)";
        $params[] = '%timeout%';
        $params[] = '%Connection refused%';
        $params[] = '%failed to connect%';
        $types .= 'sss';
    }
}
$where = count($whereParts) ? 'WHERE ' . implode(' AND ', $whereParts) : '';

// Get total count
$countSql = "SELECT COUNT(*) as cnt FROM emails $where";
$countStmt = $conn->prepare($countSql);
if ($params) $countStmt->bind_param($types, ...$params);
$countStmt->execute();
$countResult = $countStmt->get_result();
$total = $countResult ? (int) $countResult->fetch_assoc()['cnt'] : 0;
$countStmt->close();

// Get paginated data
$sql = "SELECT id, raw_emailid AS email, sp_account, sp_domain, domain_verified, domain_status, validation_response 
        FROM emails $where ORDER BY id ASC LIMIT ? OFFSET ?";
$typesWithLimit = $types . 'ii';
$dataParams = array_merge($params, [$limit, $offset]);
$dataStmt = $conn->prepare($sql);
$dataStmt->bind_param($typesWithLimit, ...$dataParams);
$dataStmt->execute();
$result = $dataStmt->get_result();

$emails = [];
while ($row = $result->fetch_assoc()) {
    $row['domain_verified'] = (bool) $row['domain_verified'];
    $row['domain_status'] = (int) $row['domain_status'];
    $emails[] = $row;
}
$dataStmt->close();

echo json_encode([
    "data" => $emails,
    "total" => $total,
    "page" => $page,
    "limit" => $limit
]);
exit;