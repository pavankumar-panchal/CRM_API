<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);
// CORS: reflect origin when allowed, allow Authorization header, and handle OPTIONS
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$allowed = [
    'http://localhost',
    'http://127.0.0.1',
    'http://localhost:3000',
    'http://localhost:5173',
    'http://localhost:8080',
];
if ($origin && in_array($origin, $allowed, true)) {
    header("Access-Control-Allow-Origin: $origin");
    header('Vary: Origin');
    header('Access-Control-Allow-Credentials: true');
} else {
    header('Access-Control-Allow-Origin: *');
}
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, Accept');
header('Access-Control-Expose-Headers: Authorization');
header('Access-Control-Max-Age: 600');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit; }

header('Content-Type: application/json');

require_once __DIR__ . '/../config/jwt.php';

mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

// Decode JWT to get user id (if present)
try {
$jwtData = decode_jwt_from_header();
$user_id = isset($jwtData->id) ? intval($jwtData->id) : 0;

    // Prepare optional user filter
    $whereUser = $user_id > 0 ? "AND c.user_id = $user_id" : "";

    // Check if any emails are in progress (not fully processed and not part of completed csv_list)
    $inProgressResult = $conn->query(
        "SELECT COUNT(*) as cnt 
        FROM emails e
        JOIN csv_list c ON e.csv_list_id = c.id
        WHERE c.status != 'completed' 
        AND (
            e.domain_verified = 0 
            OR (e.domain_processed = 0 AND (e.domain_status IS NULL OR e.domain_status = ''))
        ) $whereUser"
    );
    $inProgress = $inProgressResult->fetch_assoc()['cnt'] ?? 0;

    if ($inProgress == 0) {
    // Check if ALL csv_lists are marked as completed (optionally for this user)
    $allCompletedResult = $conn->query("SELECT COUNT(*) as pending FROM csv_list WHERE status != 'completed' $whereUser");
        $pendingLists = $allCompletedResult->fetch_assoc()['pending'] ?? 0;

        if ($pendingLists == 0) {
            echo json_encode([
                "stage" => "completed",
                "total" => 0,
                "processed" => 0,
                "percent" => 100,
                "message" => "All csv lists marked as completed"
            ]);
        } else {
            echo json_encode([
                "stage" => "idle",
                "message" => "No verification in progress"
            ]);
        }
        exit;
    }

    // --- Step 1: Domain Progress ---
    $domainTotalResult = $conn->query(
        "SELECT COUNT(*) as total 
        FROM emails e
        JOIN csv_list c ON e.csv_list_id = c.id
        WHERE c.status != 'completed' $whereUser"
    );
    $domainTotal = $domainTotalResult->fetch_assoc()['total'] ?? 0;

    $domainProcessedResult = $conn->query(
        "SELECT COUNT(*) as processed 
        FROM emails e
        JOIN csv_list c ON e.csv_list_id = c.id
        WHERE e.domain_verified = 1 AND c.status != 'completed' $whereUser"
    );
    $domainProcessed = $domainProcessedResult->fetch_assoc()['processed'] ?? 0;

    if ($domainProcessed < $domainTotal) {
        $percent = $domainTotal > 0 ? round(($domainProcessed / $domainTotal) * 100) : 0;

        echo json_encode([
            "stage" => "domain",
            "total" => (int) $domainTotal,
            "processed" => (int) $domainProcessed,
            "percent" => $percent,
            "message" => "Domain verification in progress"
        ]);
        exit;
    }

    // --- Step 2: SMTP Progress ---
    $smtpTotalResult = $conn->query(
        "SELECT COUNT(*) as total 
        FROM emails e
        JOIN csv_list c ON e.csv_list_id = c.id
        WHERE c.status != 'completed' $whereUser"
    );
    $smtpTotal = $smtpTotalResult->fetch_assoc()['total'] ?? 0;

    $smtpProcessedResult = $conn->query(
        "SELECT COUNT(*) as processed 
        FROM emails e
        JOIN csv_list c ON e.csv_list_id = c.id
        WHERE e.domain_processed = 1 AND c.status != 'completed' $whereUser"
    );
    $smtpProcessed = $smtpProcessedResult->fetch_assoc()['processed'] ?? 0;

    $percent = $smtpTotal > 0 ? round(($smtpProcessed / $smtpTotal) * 100) : 0;

    // Final Completion Check
    $allCompletedResult = $conn->query("SELECT COUNT(*) as pending FROM csv_list WHERE status != 'completed' $whereUser");
    $pendingLists = $allCompletedResult->fetch_assoc()['pending'] ?? 0;

    if ($pendingLists == 0 && $smtpProcessed >= $smtpTotal && $smtpTotal > 0) {
        echo json_encode([
            "stage" => "completed",
            "total" => (int) $smtpTotal,
            "processed" => (int) $smtpProcessed,
            "percent" => 100,
            "message" => "All csv lists and emails marked as completed"
        ]);
        exit;
    }

    echo json_encode([
        "stage" => "smtp",
        "total" => (int) $smtpTotal,
        "processed" => (int) $smtpProcessed,
        "percent" => $percent,
        "message" => "SMTP verification in progress"
    ]);
} catch (Exception $e) {
    echo json_encode([
        "error" => "Query failed",
        "details" => $e->getMessage()
    ]);
}
