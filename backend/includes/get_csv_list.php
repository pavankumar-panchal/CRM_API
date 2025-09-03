<?php
require_once __DIR__ . '/../config/jwt.php';

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

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

require_once __DIR__ . '/../config/db.php';

// Get user_id from JWT
$jwtData = decode_jwt_from_header();
$user_id = isset($jwtData->id) ? intval($jwtData->id) : 0;
if ($user_id <= 0) {
    echo json_encode([
        "status" => "error",
        "message" => "Not authenticated"
    ]);
    exit;
}

$page = isset($_GET['page']) ? max(1, intval($_GET['page'])) : 1;
$limit = isset($_GET['limit']) ? max(1, intval($_GET['limit'])) : 10;
$offset = ($page - 1) * $limit;

$search = isset($_GET['search']) ? trim($_GET['search']) : '';
$params = [$user_id];
$where = "WHERE csv_list.user_id = ?";

$types = "i"; // user_id is integer

if ($search !== '') {
    $where .= " AND csv_list.list_name LIKE ?";
    $params[] = "%$search%";
    $types .= "s";
}

// Get total count
$countSql = "SELECT COUNT(*) as total FROM csv_list $where";
$stmt = $conn->prepare($countSql);
$stmt->bind_param($types, ...$params);
$stmt->execute();
$countResult = $stmt->get_result();
$total = $countResult->fetch_assoc()['total'] ?? 0;
$stmt->close();

// Get paginated data
$sql = "SELECT * FROM csv_list $where ORDER BY id DESC LIMIT ? OFFSET ?";
$typesWithLimit = $types . "ii";
$paramsWithLimit = array_merge($params, [$limit, $offset]);
$stmt = $conn->prepare($sql);
$stmt->bind_param($typesWithLimit, ...$paramsWithLimit);
$stmt->execute();
$result = $stmt->get_result();

$lists = [];
while ($row = $result->fetch_assoc()) {
    // Fetch retryable (failed) count for this list
    $failedStmt = $conn->prepare("SELECT COUNT(*) as failed_count FROM emails WHERE csv_list_id = ? AND domain_status = 2 AND user_id = ?");
    $failedStmt->bind_param("ii", $row['id'], $user_id);
    $failedStmt->execute();
    $failedResult = $failedStmt->get_result();
    $failedRow = $failedResult->fetch_assoc();
    $row['failed_count'] = intval($failedRow['failed_count'] ?? 0);
    $failedStmt->close();

    $lists[] = $row;
}
$stmt->close();

echo json_encode([
    'status' => 'success',
    'data' => $lists,
    'total' => intval($total),
    'page' => $page,
    'limit' => $limit
]);
exit;
