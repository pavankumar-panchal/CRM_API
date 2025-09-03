<?php
require_once __DIR__ . '/../config/jwt.php';

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
header("Access-Control-Allow-Headers: Content-Type, X-Requested-With, Authorization");

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

// Fetch and verify user from JWT
$jwtData = decode_jwt_from_header();
if (!$jwtData) {
    debug_log('Missing or invalid JWT token');
    ob_clean();
    echo json_encode([
        "status" => "error",
        "message" => "Authentication required"
    ]);
    exit;
}
$user_id = isset($jwtData->id) ? intval($jwtData->id) : 0;
$user_name = $jwtData->name ?? '';
$user_email = $jwtData->email ?? '';

// Log JWT data for debugging
debug_log('JWT user_id: ' . $user_id);
debug_log('JWT user_name: ' . $user_name);
debug_log('JWT user_email: ' . $user_email);

// Verify user against database
if ($user_id <= 0 || empty($user_email)) {
    debug_log('Invalid or missing user data in JWT');
    ob_clean();
    echo json_encode([
        "status" => "error",
        "message" => "Invalid token data"
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
    // Enforce maximum upload size (5 MB) at application level
    $maxBytes = 5 * 1024 * 1024; // 5 MB
    if (!isset($_FILES['csv_file'])) {
        debug_log('No file part in upload');
        return ["status" => "error", "message" => "No file uploaded"];
    }

    $fileError = $_FILES['csv_file']['error'] ?? UPLOAD_ERR_NO_FILE;
    if ($fileError !== UPLOAD_ERR_OK) {
        // If PHP rejected the upload because of ini settings, return useful guidance
        if (in_array($fileError, [UPLOAD_ERR_INI_SIZE, UPLOAD_ERR_FORM_SIZE], true)) {
            debug_log('Upload rejected by PHP ini limits; error code: ' . $fileError);
            return ["status" => "error", "message" => "Uploaded file too large for server configuration. Increase upload_max_filesize/post_max_size to allow 5 MB uploads."];
        }
        debug_log('File upload error code: ' . $fileError);
        return ["status" => "error", "message" => "File upload failed (code: $fileError)"];
    }

    if (isset($_FILES['csv_file']['size']) && intval($_FILES['csv_file']['size']) > $maxBytes) {
        debug_log('Uploaded file exceeds maximum allowed size: ' . intval($_FILES['csv_file']['size']));
        return ["status" => "error", "message" => "Uploaded file exceeds maximum allowed size of 5 MB"];
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

    // If no rows were collected, rollback and delete the csv_list record to avoid empty lists
    $totalRowsCollected = $inserted_count + $invalid_account_count + $excluded_count;
    if ($totalRowsCollected === 0) {
        $conn->rollback();
        // Remove the previously created list since nothing useful was inserted
        $del = $conn->prepare("DELETE FROM csv_list WHERE id = ? AND user_id = ?");
        if ($del) {
            $del->bind_param('ii', $campaignListId, $user_id);
            $del->execute();
            $del->close();
        }
        debug_log('CSV upload contained no valid rows, list deleted: ' . $campaignListId);
        return ["status" => "error", "message" => "CSV file contained no valid rows. No data was imported."];
    }

    if (!empty($bulkInsertValues)) {
        // Chunk inserts to avoid exceeding MySQL max_allowed_packet
        $rows = count($bulkInsertValues);
        $paramsPerRow = 9; // number of parameters per row in our VALUES
        $chunkSize = 200; // rows per chunk; safe default for production

        // helper to get refs for bind_param
        $makeRefs = function (&$arr) {
            $refs = [];
            foreach ($arr as $key => $value) {
                $refs[$key] = &$arr[$key];
            }
            return $refs;
        };

        for ($offset = 0; $offset < $rows; $offset += $chunkSize) {
            $chunkValues = array_slice($bulkInsertValues, $offset, $chunkSize);
            $chunkParams = array_slice($bulkInsertParams, $offset * $paramsPerRow, count($chunkValues) * $paramsPerRow);

            $query = $bulkInsertQuery . implode(",", $chunkValues);
            $stmt = $conn->prepare($query);
            if (!$stmt) {
                $conn->rollback();
                debug_log('Failed to prepare chunked bulk insert: ' . $conn->error);
                return ["status" => "error", "message" => "Failed to prepare insert: " . $conn->error];
            }

            $types = str_repeat("isssiiisi", count($chunkValues));
            $bindParams = array_merge([$types], $chunkParams);
            $refs = $makeRefs($bindParams);

            if (!call_user_func_array([$stmt, 'bind_param'], $refs)) {
                $conn->rollback();
                debug_log('bind_param failed: ' . $stmt->error);
                return ["status" => "error", "message" => "Failed to bind parameters: " . $stmt->error];
            }

            if (!$stmt->execute()) {
                // Check for max_allowed_packet style error and return a friendly message
                $err = $stmt->error ?: $conn->error;
                $conn->rollback();
                debug_log('Chunk execute failed: ' . $err);
                if (stripos($err, 'packet') !== false) {
                    return ["status" => "error", "message" => "Server rejected large packet. Try uploading a smaller file or increase MySQL 'max_allowed_packet' setting." ];
                }
                return ["status" => "error", "message" => "Bulk insert failed: " . $err];
            }
            $stmt->close();
        }
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
        if ($totalEmails > 0) {
            $batchSize = ceil($totalEmails / $workerCount);
            $emailIndex = 0;
            foreach ($workers as $worker) {
                $assignedEmails = array_slice($emails, $emailIndex, $batchSize);
                if (count($assignedEmails) > 0) {
                    $ids = implode(',', array_map('intval', $assignedEmails));
                    $stmt = $conn->prepare("UPDATE emails SET worker_id = ? WHERE id IN ($ids) AND user_id = ?");
                    if ($stmt) {
                        $stmt->bind_param("ii", $worker['id'], $user_id);
                        $stmt->execute();
                        $stmt->close();
                    } else {
                        debug_log('Failed to prepare update for worker assignment: ' . $conn->error);
                    }
                }
                $emailIndex += $batchSize;
            }
        }
    } else {
        // No configured workers: default to worker id 1
        $defaultWorkerId = 1;
        $stmt = $conn->prepare("UPDATE emails SET worker_id = ? WHERE csv_list_id = ? AND user_id = ? AND worker_id IS NULL");
        if ($stmt) {
            $stmt->bind_param("iii", $defaultWorkerId, $campaignListId, $user_id);
            $stmt->execute();
            $affected = $stmt->affected_rows;
            $stmt->close();
            debug_log("No workers configured — assigned $affected emails to default worker_id=$defaultWorkerId");
        } else {
            debug_log('Failed to assign default worker id: ' . $conn->error);
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