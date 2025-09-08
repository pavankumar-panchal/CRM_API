<?php
// Router for backend API - centralized CORS + routing
require_once __DIR__ . '/../config/cors.php';
require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../config/jwt.php';

function send_json($data, $code = 200)
{
    http_response_code($code);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data);
    exit;
}

function normalizeEmail($email)
{
    $email = urldecode(trim((string)$email));
    if (stripos($email, '@gamil.com') !== false) {
        $email = str_ireplace('@gamil.com', '@gmail.com', $email);
    }
    return $email;
}

$endpoint = $_GET['endpoint'] ?? null;
$fullPath = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$basePath = str_replace('\\', '/', $_SERVER['SCRIPT_NAME']);
$request = str_replace($basePath, '', $fullPath);
$request = preg_replace('/\?.*/', '', $request);
$request = rtrim($request, '/');
$method = $_SERVER['REQUEST_METHOD'];

// Built-in endpoints: register, login, check-auth, logout
if ($method === 'POST' && $endpoint === 'register') {
    $input = json_decode(file_get_contents('php://input'), true);
    $name = trim($input['name'] ?? '');
    $email = normalizeEmail($input['email'] ?? '');
    $password = $input['password'] ?? '';
    if (!$name || !$email || !$password) send_json(['status' => 'error', 'message' => 'All fields required'], 400);
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) send_json(['status' => 'error', 'message' => 'Invalid email'], 400);
    $stmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
    $stmt->bind_param('s', $email);
    $stmt->execute();
    $stmt->store_result();
    if ($stmt->num_rows > 0) {
        $stmt->close();
        send_json(['status' => 'error', 'message' => 'Email already registered'], 409);
    }
    $stmt->close();
    $hashed = password_hash($password, PASSWORD_BCRYPT);
    $stmt = $conn->prepare("INSERT INTO users (name,email,password) VALUES (?,?,?)");
    $stmt->bind_param('sss', $name, $email, $hashed);
    if ($stmt->execute()) {
        send_json(['status' => 'success', 'message' => 'Registration successful']);
    }
    send_json(['status' => 'error', 'message' => 'Registration failed'], 500);
}

if ($method === 'POST' && $endpoint === 'login') {
    $input = json_decode(file_get_contents('php://input'), true);
    $email = normalizeEmail($input['email'] ?? '');
    $password = $input['password'] ?? '';
    if (!$email || !$password) send_json(['status' => 'error', 'message' => 'Email and password required'], 400);
    $stmt = $conn->prepare("SELECT id,name,email,password FROM users WHERE email = ?");
    $stmt->bind_param('s', $email);
    $stmt->execute();
    $res = $stmt->get_result();
    if ($res->num_rows === 0) send_json(['status' => 'error', 'message' => 'Invalid credentials'], 401);
    $user = $res->fetch_assoc();
    if (!password_verify($password, $user['password'])) send_json(['status' => 'error', 'message' => 'Invalid credentials'], 401);
    $token = create_jwt(['id' => $user['id'], 'name' => $user['name'], 'email' => $user['email']]);
    send_json(['status' => 'success', 'message' => 'Login successful', 'token' => $token, 'user' => ['id' => $user['id'], 'name' => $user['name'], 'email' => $user['email']]]);
}

// Dev-only login to obtain a test JWT when ALLOW_DEV_LOGIN=1 is set in environment
if ($method === 'POST' && $endpoint === 'dev-login') {
    // only enabled when configured
    global $jwt_config;
    if (empty($jwt_config['allow_dev_login'])) {
        send_json(['status' => 'error', 'message' => 'Dev login not allowed'], 403);
    }
    $input = json_decode(file_get_contents('php://input'), true) ?: [];
    $email = $input['email'] ?? 'dev@example.com';
    // create a JWT with a short expiry for the requested email
    $user = ['id' => 0, 'name' => 'dev', 'email' => $email];
    $token = create_jwt($user);
    send_json(['status' => 'success', 'message' => 'Dev login', 'token' => $token, 'user' => $user]);
}

if ($method === 'GET' && $endpoint === 'check-auth') {
    $data = decode_jwt_from_header();
    if (!$data) send_json(['status' => 'error', 'message' => 'Not authenticated'], 401);
    send_json(['status' => 'success', 'user' => ['id' => $data->id, 'name' => $data->name, 'email' => $data->email]]);
}

if ($method === 'POST' && $endpoint === 'logout') {
    send_json(['status' => 'success', 'message' => 'Logged out (client should delete stored token)']);
}

try {
    switch (true) {
        case ($request === '/api/upload'):
            require __DIR__ . '/../public/email_processor.php';
            break;
        case ($request === '/api/results'):
            require __DIR__ . '/../includes/get_results.php';
            break;
        case ($endpoint === 'get-csv-list'):
            require __DIR__ . '/../includes/get_csv_list.php';
            break;
        case ($endpoint === 'get-results'):
            require __DIR__ . '/../includes/get_results.php';
            break;
        case ($endpoint === 'progress'):
            require __DIR__ . '/../includes/progress.php';
            break;
        case ($endpoint === 'retry-smtp'):
            require __DIR__ . '/../includes/retry_smtp.php';
            break;
        case ($request === '/api/monitor/campaigns' && $method === 'GET'):
            require __DIR__ . '/../includes/monitor_campaigns.php';
            break;
        case ($request === '/api/master/campaigns'):
            require __DIR__ . '/../includes/campaign.php';
            break;
        case ($request === '/api/master/campaigns_master'):
            require __DIR__ . '/../public/campaigns_master.php';
            break;
        case ($request === '/api/master/smtps'):
            require __DIR__ . '/../includes/master_smtps.php';
            break;
        case ($request === '/api/master/distribution'):
            require __DIR__ . '/../includes/campaign_distribution.php';
            break;
        case ($request === '/api/retry-failed' && $method === 'POST'):
            $cmd = 'php ' . escapeshellarg(__DIR__ . '/../includes/retry_smtp.php') . ' > /dev/null 2>&1 &';
            exec($cmd);
            send_json(['status' => 'success', 'message' => 'Retry process started in background.']);
            break;
        case ($request === '/api/master/email-counts'):
            $sql = "SELECT
                    COUNT(*) AS total_valid,
                    SUM(CASE WHEN mb.status IS NULL OR mb.status = 'pending' THEN 1 ELSE 0 END) AS pending,
                    SUM(CASE WHEN mb.status = 'success' THEN 1 ELSE 0 END) AS sent,
                    SUM(CASE WHEN mb.status = 'failed' THEN 1 ELSE 0 END) AS failed
                FROM emails e
                LEFT JOIN mail_blaster mb ON mb.to_mail = e.raw_emailid
                WHERE e.domain_status = 1";
            $result = $conn->query($sql);
            $row = $result->fetch_assoc();
            send_json([
                'total_valid' => (int)$row['total_valid'],
                'pending' => (int)$row['pending'],
                'sent' => (int)$row['sent'],
                'failed' => (int)$row['failed'],
            ]);
            break;
        case ($request === '/api/workers'):
            require __DIR__ . '/../includes/workers.php';
            break;
        case ($request === '/api/received-response' || $request === '/api/emails' || strpos($request, '/api/emails') === 0):
            require __DIR__ . '/../app/received_response.php';
            break;
        case (preg_match('#^/api/master/smtps/(\d+)/accounts/(\d+)$#', $request, $m)):
            $_GET['smtp_server_id'] = $m[1];
            $_GET['account_id'] = $m[2];
            require __DIR__ . '/../includes/smtp_accounts.php';
            break;
        case (preg_match('#^/api/master/smtps/(\d+)/accounts$#', $request, $m)):
            $_GET['smtp_server_id'] = $m[1];
            require __DIR__ . '/../includes/smtp_accounts.php';
            break;
        default:
            send_json(['status' => 'error', 'message' => 'Endpoint not found'], 404);
    }
} catch (Exception $e) {
    send_json(['status' => 'error', 'message' => $e->getMessage()], 500);
}


