<?php
session_start();

header('Content-Type: application/json');

// CORS configuration
$origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';
$allowedOrigins = [
    'http://localhost',
    'http://127.0.0.1',
    'http://localhost:3000',
    'http://localhost:5173',
    'http://localhost:8080',
];
if ($origin && in_array($origin, $allowedOrigins, true)) {
    header("Access-Control-Allow-Origin: $origin");
    header("Vary: Origin");
    header("Access-Control-Allow-Credentials: true");
}
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

ob_start();
ob_clean();

require_once __DIR__ . '/../config/db.php';

// Debug logging function
function debug_log($msg) {
    file_put_contents(__DIR__ . '/../storage/email_processor_debug.log', "[" . date('Y-m-d H:i:s') . "] $msg\n", FILE_APPEND);
}

// Fetch and verify user from session
$user_id = isset($_SESSION['user_id']) ? intval($_SESSION['user_id']) : 0;
$user_name = $_SESSION['user_name'] ?? '';
$user_email = $_SESSION['user_email'] ?? '';

// Log session data for debugging
debug_log('Session user_id: ' . $user_id);
debug_log('Session user_name: ' . $user_name);
debug_log('Session user_email: ' . $user_email);

// Verify user against database
if ($user_id <= 0 || empty($user_email)) {
    debug_log('Invalid or missing user_id or user_email in session');
    ob_clean();
    echo json_encode([
        "status" => "error",
        "message" => "Invalid or missing session data",
        "session" => $_SESSION
    ]);
    exit;
}

// Verify user exists in the database
$stmt = $conn->prepare("SELECT id, name, email FROM users WHERE id = ? AND email = ?");
$stmt->bind_param("is", $user_id, $user_email);
$stmt->execute();
$result = $stmt->get_result();
if ($result->num_rows === 0) {
    debug_log('User verification failed: No matching user found in database');
    ob_clean();
    echo json_encode([
        "status" => "error",
        "message" => "User verification failed: Invalid user credentials"
    ]);
    $stmt->close();
    exit;
}
$user_data = $result->fetch_assoc();
$stmt->close();

// Ensure session data matches database
if ($user_name !== $user_data['name']) {
    debug_log('Session user_name does not match database');
    ob_clean();
    echo json_encode([
        "status" => "error",
        "message" => "Session data mismatch"
    ]);
    exit;
}

if ($conn->connect_error) {
    debug_log('Database connection failed: ' . $conn->connect_error);
    ob_clean();
    echo json_encode(["status" => "error", "message" => "Database connection failed: " . $conn->connect_error]);
    exit;
}

$method = $_SERVER['REQUEST_METHOD'];

try {
    switch ($method) {
        case 'POST':
            $response = handlePostRequest($conn, $user_id, $user_name, $user_email);
            break;
        case 'GET':
            $response = handleGetRequest($conn, $user_id);
            break;
        case 'DELETE':
            $response = handleDeleteRequest($conn, $user_id);
            break;
        default:
            $response = ["status" => "error", "message" => "Method not allowed"];
    }

    ob_clean();
    echo json_encode($response, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
} catch (Exception $e) {
    debug_log('Exception: ' . $e->getMessage());
    ob_clean();
    echo json_encode(["status" => "error", "message" => "Server error: " . $e->getMessage()]);
}

$conn->close();
ob_end_flush();
exit;

// --- FUNCTIONS ---

function getExcludedAccounts($conn) {
    $result = $conn->query("SELECT account FROM exclude_accounts");
    $excludedAccounts = [];
    while ($row = $result->fetch_assoc()) {
        $excludedAccounts[] = strtolower(trim($row['account']));
    }
    return $excludedAccounts;
}

function getExcludedDomainsWithIPs($conn) {
    $result = $conn->query("SELECT domain, ip_address FROM exclude_domains");
    $excludedDomains = [];
    while ($row = $result->fetch_assoc()) {
        $domain = strtolower(trim($row['domain']));
        $ip = trim($row['ip_address']);
        if (!empty($domain)) {
            $excludedDomains[$domain] = $ip;
        }
    }
    return $excludedDomains;
}

function isValidAccountName($account) {
    if (!preg_match('/^[a-z0-9](?!.*[._-]{2})[a-z0-9._-]*[a-z0-9]$/i', $account)) {
        return false;
    }
    if (strlen($account) < 1 || strlen($account) > 64) {
        return false;
    }
    if (preg_match('/^[0-9]+$/', $account)) {
        return false;
    }
    return true;
}

function normalizeGmail($email) {
    $parts = explode('@', strtolower(trim($email)));
    if (count($parts) !== 2 || $parts[1] !== 'gmail.com') {
        return $email;
    }
    $account = $parts[0];
    $account = str_replace('.', '', $account);
    $account = explode('+', $account)[0];
    return $account . '@gmail.com';
}

function handlePostRequest($conn, $user_id, $user_name, $user_email) {
    if (!isset($_FILES['csv_file']) || $_FILES['csv_file']['error'] !== UPLOAD_ERR_OK) {
        debug_log('No valid file uploaded');
        return ["status" => "error", "message" => "No valid file uploaded"];
    }

    $file = $_FILES['csv_file']['tmp_name'];
    $listName = $_POST['list_name'] ?? 'Unnamed List';
    $fileName = $_POST['file_name'] ?? $_FILES['csv_file']['name'];

    $excludedAccounts = getExcludedAccounts($conn);
    $excludedDomains = getExcludedDomainsWithIPs($conn);

    $batchSize = 5000;
    $skipped_count = 0;
    $inserted_count = 0;
    $excluded_count = 0;
    $invalid_account_count = 0;
    $uniqueEmails = [];

    // Insert a new csv_list row with user_id
    $insertListStmt = $conn->prepare("INSERT INTO csv_list (user_id, list_name, file_name, created_at) VALUES (?, ?, ?, NOW())");
    $insertListStmt->bind_param("iss", $user_id, $listName, $fileName);
    if (!$insertListStmt->execute()) {
        debug_log('Failed to create campaign list: ' . $insertListStmt->error);
        return ["status" => "error", "message" => "Failed to create campaign list"];
    }
    $campaignListId = $conn->insert_id;
    $insertListStmt->close();

    $conn->begin_transaction();

    // Fetch existing emails for the user
    $existingEmails = [];
    $stmt = $conn->prepare("SELECT raw_emailid FROM emails WHERE user_id = ?");
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $result = $stmt->get_result();
    while ($row = $result->fetch_assoc()) {
        $existingEmails[strtolower($row['raw_emailid'])] = true;
    }
    $stmt->close();

    $bulkInsertValues = [];
    $bulkInsertParams = [];
    $bulkInsertQuery = "INSERT INTO emails (user_id, raw_emailid, sp_account, sp_domain, domain_verified, domain_status, validation_response, domain_processed, csv_list_id) VALUES ";

    if (($handle = fopen($file, "r")) === false) {
        $conn->rollback();
        debug_log('Failed to read CSV file');
        return ["status" => "error", "message" => "Failed to read CSV file"];
    }

    while (($data = fgetcsv($handle, 1000, ",")) !== false) {
        if (empty($data[0])) {
            continue;
        }
        if (stripos(trim($data[0]), 'email') === 0) {
            continue;
        }
        $email = normalizeGmail(trim($data[0]));
        $email = preg_replace('/[^\x20-\x7E]/', '', $email);
        $emailKey = strtolower($email);

        if (isset($uniqueEmails[$emailKey]) || isset($existingEmails[$emailKey])) {
            $skipped_count++;
            continue;
        }
        $uniqueEmails[$emailKey] = true;

        $emailParts = explode("@", $email);
        if (count($emailParts) != 2) {
            $bulkInsertValues[] = "(?, ?, ?, ?, ?, ?, ?, ?, ?)";
            $bulkInsertParams[] = $user_id;
            $bulkInsertParams[] = $email;
            $bulkInsertParams[] = '';
            $bulkInsertParams[] = '';
            $bulkInsertParams[] = 1;
            $bulkInsertParams[] = 0;
            $bulkInsertParams[] = "Invalid email format";
            $bulkInsertParams[] = 0;
            $bulkInsertParams[] = $campaignListId;
            $invalid_account_count++;
            continue;
        }

        [$sp_account, $sp_domain] = $emailParts;
        $domain_verified = 0;
        $domain_status = 0;
        $validation_response = "Not Verified Yet";

        if (!isValidAccountName($sp_account)) {
            $bulkInsertValues[] = "(?, ?, ?, ?, ?, ?, ?, ?, ?)";
            $bulkInsertParams[] = $user_id;
            $bulkInsertParams[] = $email;
            $bulkInsertParams[] = $sp_account;
            $bulkInsertParams[] = $sp_domain;
            $bulkInsertParams[] = 1;
            $bulkInsertParams[] = 0;
            $bulkInsertParams[] = "Invalid account name";
            $bulkInsertParams[] = 0;
            $bulkInsertParams[] = $campaignListId;
            $invalid_account_count++;
            continue;
        }

        if (in_array(strtolower($sp_account), $excludedAccounts)) {
            $domain_verified = 1;
            $domain_status = 1;
            $validation_response = "Excluded: Account";
            $excluded_count++;
        } elseif (array_key_exists(strtolower($sp_domain), $excludedDomains)) {
            $domain_verified = 1;
            $domain_status = 1;
            $validation_response = $excludedDomains[strtolower($sp_domain)];
            $excluded_count++;
        }

        $bulkInsertValues[] = "(?, ?, ?, ?, ?, ?, ?, ?, ?)";
        $bulkInsertParams[] = $user_id;
        $bulkInsertParams[] = $email;
        $bulkInsertParams[] = $sp_account;
        $bulkInsertParams[] = $sp_domain;
        $bulkInsertParams[] = $domain_verified;
        $bulkInsertParams[] = $domain_status;
        $bulkInsertParams[] = $validation_response;
        $bulkInsertParams[] = 0;
        $bulkInsertParams[] = $campaignListId;
        $inserted_count++;
    }

    if (!empty($bulkInsertValues)) {
        $query = $bulkInsertQuery . implode(",", $bulkInsertValues);
        $stmt = $conn->prepare($query);
        if (!$stmt) {
            $conn->rollback();
            debug_log('Failed to prepare bulk insert: ' . $conn->error);
            return ["status" => "error", "message" => "Failed to prepare bulk insert: " . $conn->error];
        }
        $types = str_repeat("isssiiisi", count($bulkInsertValues));
        $stmt->bind_param($types, ...$bulkInsertParams);
        if (!$stmt->execute()) {
            $conn->rollback();
            debug_log('Bulk insert failed: ' . $stmt->error);
            return ["status" => "error", "message" => "Bulk insert failed: " . $stmt->error];
        }
        $stmt->close();
    }

    $conn->commit();
    fclose($handle);

    $total = $inserted_count + $invalid_account_count + $excluded_count;
    $valid = $excluded_count;
    $invalid = $invalid_account_count;

    $updateListStmt = $conn->prepare("UPDATE csv_list SET total_emails = ?, valid_count = ?, invalid_count = ? WHERE id = ? AND user_id = ?");
    $updateListStmt->bind_param("iiiii", $total, $valid, $invalid, $campaignListId, $user_id);
    if (!$updateListStmt->execute()) {
        debug_log('Failed to update campaign list: ' . $updateListStmt->error);
        return ["status" => "error", "message" => "Failed to update campaign list: " . $updateListStmt->error];
    }
    $updateListStmt->close();

    // Assign emails to workers
    $workers = getWorkers($conn);
    $workerCount = count($workers);

    if ($workerCount > 0) {
        $stmt = $conn->prepare("SELECT id FROM emails WHERE csv_list_id = ? AND worker_id IS NULL AND user_id = ?");
        $stmt->bind_param("ii", $campaignListId, $user_id);
        $stmt->execute();
        $result = $stmt->get_result();
        $emails = [];
        while ($row = $result->fetch_assoc()) {
            $emails[] = $row['id'];
        }
        $stmt->close();

        $totalEmails = count($emails);
        $batchSize = ceil($totalEmails / $workerCount);
        $emailIndex = 0;
        foreach ($workers as $worker) {
            $assignedEmails = array_slice($emails, $emailIndex, $batchSize);
            if (count($assignedEmails) > 0) {
                $ids = implode(',', array_map('intval', $assignedEmails));
                $stmt = $conn->prepare("UPDATE emails SET worker_id = ? WHERE id IN ($ids) AND user_id = ?");
                $stmt->bind_param("ii", $worker['id'], $user_id);
                $stmt->execute();
                $stmt->close();
            }
            $emailIndex += $batchSize;
        }
    }

    return [
        "status" => "success",
        "message" => "CSV processed successfully",
        "inserted" => $inserted_count,
        "excluded" => $excluded_count,
        "invalid_accounts" => $invalid_account_count,
        "csv_list_id" => $campaignListId,
        "total_emails" => $total,
        "valid" => $valid,
        "invalid" => $invalid,
        "user_id" => $user_id,
        "user_name" => $user_name,
        "user_email" => $user_email
    ];
}

function handleGetRequest($conn, $user_id) {
    $stmt = $conn->prepare("SELECT id, raw_emailid, sp_account, sp_domain, 
                            COALESCE(domain_verified, 0) AS domain_verified, 
                            COALESCE(domain_status, 0) AS domain_status, 
                            COALESCE(validation_response, 'Not Verified Yet') AS validation_response
                            FROM emails WHERE user_id = ?");
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $result = $stmt->get_result();
    $emails = [];
    while ($row = $result->fetch_assoc()) {
        $emails[] = $row;
    }
    $stmt->close();
    return $emails;
}

function handleDeleteRequest($conn, $user_id) {
    $id = intval($_GET['id'] ?? 0);
    if ($id <= 0) {
        debug_log('Invalid ID for delete request');
        return ["status" => "error", "message" => "Invalid ID"];
    }
    $stmt = $conn->prepare("DELETE FROM emails WHERE id = ? AND user_id = ?");
    $stmt->bind_param("ii", $id, $user_id);
    if ($stmt->execute() && $stmt->affected_rows > 0) {
        $stmt->close();
        return ["status" => "success", "message" => "Email deleted"];
    } else {
        $stmt->close();
        debug_log('Deletion failed or email not found for ID: ' . $id);
        return ["status" => "error", "message" => "Deletion failed or email not found"];
    }
}

function getWorkers($conn) {
    $result = $conn->query("SELECT id, workername, ip FROM workers");
    $workers = [];
    while ($row = $result->fetch_assoc()) {
        $workers[] = $row;
    }
    return $workers;
}
?>