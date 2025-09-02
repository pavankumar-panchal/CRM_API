<?php
// ====== BOOTSTRAP ======
session_start();

// --- CORS: allow credentials and reflect Origin (no "*")
$origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';
if ($origin) {
    // Allow localhost origins; add others as needed
    $allowedOrigins = [
        'http://localhost',
        'http://127.0.0.1',
        'http://localhost:3000',
        'http://localhost:5173', // Vite default
        'http://localhost:8080',
    ];
    if (in_array($origin, $allowedOrigins, true)) {
        header("Access-Control-Allow-Origin: $origin");
        header("Vary: Origin");
        header("Access-Control-Allow-Credentials: true");
    }
} else {
    // Fallback (no Origin). It's safe to omit ACAO then.
    // header("Access-Control-Allow-Origin: *"); // DON'T use * with credentials
}

header("Access-Control-Allow-Credentials: true");
// header("Access-Control-Allow-Origin: http://localhost:3000"); // or your frontend origin

header('Content-Type: application/json');
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

// Handle CORS preflight OPTIONS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// --- Secure session cookie settings (OK for localhost)
// NOTE: On HTTPS, set secure=1 and SameSite=None
ini_set('session.cookie_httponly', 1);
ini_set('session.cookie_secure', 0); // 1 only on HTTPS
ini_set('session.use_strict_mode', 1);
if (PHP_VERSION_ID >= 70300) {
    // SameSite=Lax works well for same-site localhost (ports don't matter for SameSite)
    session_set_cookie_params([
        'lifetime' => 0,
        'path' => '/',
        'domain' => '',       // default host
        'secure' => false,    // true on HTTPS
        'httponly' => true,
        'samesite' => 'Lax'
    ]);
}

// ====== HELPERS ======
function send_json($data, $code = 200) {
    http_response_code($code);
    echo json_encode($data);
    exit;
}

// Session idle timeout (15 minutes)
$expire_time = 15 * 60;
if (isset($_SESSION['user_id'])) {
    if (isset($_SESSION['last_activity']) && (time() - $_SESSION['last_activity']) > $expire_time) {
        $_SESSION = [];
        if (ini_get("session.use_cookies")) {
            $params = session_get_cookie_params();
            setcookie(session_name(), '', time() - 42000, $params['path'], $params['domain'], $params['secure'], $params['httponly']);
        }
        session_destroy();
    } else {
        $_SESSION['last_activity'] = time();
    }
}

require_once __DIR__ . '/../config/db.php';

// ====== OPTIONAL JWT (kept because your other routes use it) ======
$secretKey = 'f5c8b8b96a818f7e8ef8ad19ea5bf94c459a8bdbe364fe3459703fcc6297baf5de88aa0dfb7be5898d029c16dd16e40f37532e925a1d7f8f3c4b8b4af71763bb';

require_once __DIR__ . '/../vendor/firebase/php-jwt/src/JWT.php';
require_once __DIR__ . '/../vendor/firebase/php-jwt/src/Key.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

function validate_jwt_token($jwt, $secretKey) {
    try {
        return JWT::decode($jwt, new Key($secretKey, 'HS256'));
    } catch (Exception $e) {
        send_json(['error' => 'Invalid or expired token'], 401);
    }
}
function authenticate($secretKey) {
    $headers = function_exists('getallheaders') ? getallheaders() : [];
    if (empty($headers['Authorization'])) {
        send_json(['error' => 'Missing token'], 401);
    }
    $jwt = str_replace('Bearer ', '', $headers['Authorization']);
    return validate_jwt_token($jwt, $secretKey);
}

// ====== ROUTING SETUP ======
// Support both styles: ?endpoint=... and /api/...
$endpoint = $_GET['endpoint'] ?? null;

$fullPath = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$basePath = str_replace('\\', '/', $_SERVER['SCRIPT_NAME']); // /CRM_API/backend/routes/api.php
$request  = str_replace($basePath, '', $fullPath);           // e.g., "/api/login"
$request  = preg_replace('/\?.*/', '', $request);
$request  = rtrim($request, '/');
$method   = $_SERVER['REQUEST_METHOD'];

// ====== ENDPOINTS ======

// --- Registration (query-param style only, as you had)
if ($method === 'POST' && ($endpoint ?? '') === 'register') {
    $input = json_decode(file_get_contents('php://input'), true);
    $name = trim($input['name'] ?? '');
    $email = trim($input['email'] ?? '');
    $password = $input['password'] ?? '';

    if (!$name || !$email || !$password) {
        send_json(['status' => 'error', 'message' => 'All fields are required'], 400);
    }
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        send_json(['status' => 'error', 'message' => 'Invalid email format'], 400);
    }

    $stmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();
    if ($stmt->num_rows > 0) {
        send_json(['status' => 'error', 'message' => 'Email already registered'], 409);
    }
    $stmt->close();

    $hashed = password_hash($password, PASSWORD_BCRYPT);
    $stmt = $conn->prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $name, $email, $hashed);
    if ($stmt->execute()) {
        send_json(['status' => 'success', 'message' => 'Registration successful']);
    } else {
        send_json(['status' => 'error', 'message' => 'Registration failed'], 500);
    }
}

// --- Login (supports both ?endpoint=login and /api/login)
if ($method === 'POST' && ($endpoint ?? '') === 'login') {
    $input = json_decode(file_get_contents('php://input'), true);
    $email = trim($input['email'] ?? '');
    $password = $input['password'] ?? '';

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        send_json(['status' => 'error', 'message' => 'Invalid email format'], 400);
    }

    $stmt = $conn->prepare("SELECT id, name, email, password FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();
    if ($stmt->num_rows === 0) {
        send_json(['status' => 'error', 'message' => 'Invalid credentials'], 401);
    }
    $stmt->bind_result($id, $name, $email_db, $hashed);
    $stmt->fetch();

    if (!password_verify($password, $hashed)) {
        send_json(['status' => 'error', 'message' => 'Invalid credentials'], 401);
    }

    // Regenerate session ID for fixation protection
    session_regenerate_id(true);

    // Persist user to session
    $_SESSION['user_id'] = $id;
    $_SESSION['user_name'] = $name;
    $_SESSION['user_email'] = $email_db;
    $_SESSION['last_activity'] = time();

    // Set cookies for username and email (expires in 1 day)
    setcookie("user_name", $name, time() + 86400, "/");
    setcookie("user_email", $email_db, time() + 86400, "/");

    send_json(['status' => 'success', 'message' => 'Login successful']);
}

// --- Check auth (supports both ?endpoint=check-auth and /api/check-auth)
if ($method === 'GET' && ($endpoint ?? '') === 'check-auth') {
    if (!isset($_SESSION['user_id'])) {
        send_json(['status' => 'error', 'message' => 'Not authenticated'], 200);
    }
    send_json([
        'status' => 'success',
        'user' => [
            'id'    => $_SESSION['user_id'],
            'name'  => $_SESSION['user_name'],
            'email' => $_SESSION['user_email'],
        ]
    ]);
}

// --- Logout (supports both ?endpoint=logout and /api/logout)
if ($method === 'POST' && ($endpoint ?? '') === 'logout') {
    setcookie("user_name", "", time() - 3600, "/");
    setcookie("user_email", "", time() - 3600, "/");
    session_destroy();
    send_json(['status' => 'success', 'message' => 'Logged out']);
}

// ====== YOUR EXISTING PROTECTED/JWT ROUTES ======
try {
    switch (true) {
        case ($request === '/api/upload'):
            authenticate($secretKey);
            require __DIR__ . '/../public/email_processor.php';
            break;

        case ($request === '/api/results'):
            authenticate($secretKey);
            require __DIR__ . '/../includes/get_results.php';
            break;

        case ($request === '/api/monitor/campaigns' && $method === 'GET'):
            authenticate($secretKey);
            require __DIR__ . '/../includes/monitor_campaigns.php';
            break;

        case ($request === '/api/master/campaigns'):
            authenticate($secretKey);
            require __DIR__ . '/../includes/campaign.php';
            break;

        case ($request === '/api/master/campaigns_master'):
            authenticate($secretKey);
            require __DIR__ . '/../public/campaigns_master.php';
            break;

        case ($request === '/api/master/smtps'):
            authenticate($secretKey);
            require __DIR__ . '/../includes/master_smtps.php';
            break;

        case ($request === '/api/master/distribution'):
            authenticate($secretKey);
            require __DIR__ . '/../includes/campaign_distribution.php';
            break;

        case ($request === '/api/retry-failed' && $method === 'POST'):
            authenticate($secretKey);
            $cmd = 'php ' . escapeshellarg(__DIR__ . '/../includes/retry_smtp.php') . ' > /dev/null 2>&1 &';
            exec($cmd);
            send_json(['status' => 'success', 'message' => 'Retry process started in background.']);
            break;

        case ($request === '/api/master/email-counts'):
            authenticate($secretKey);
            $result = $conn->query("
                SELECT
                    COUNT(*) AS total_valid,
                    SUM(CASE WHEN mb.status IS NULL OR mb.status = 'pending' THEN 1 ELSE 0 END) AS pending,
                    SUM(CASE WHEN mb.status = 'success' THEN 1 ELSE 0 END) AS sent,
                    SUM(CASE WHEN mb.status = 'failed' THEN 1 ELSE 0 END) AS failed
                FROM emails e
                LEFT JOIN mail_blaster mb ON mb.to_mail = e.raw_emailid
                WHERE e.domain_status = 1
            ");
            $row = $result->fetch_assoc();
            send_json([
                'total_valid' => (int)$row['total_valid'],
                'pending'     => (int)$row['pending'],
                'sent'        => (int)$row['sent'],
                'failed'      => (int)$row['failed'],
            ]);
            break;

        case ($request === '/api/workers'):
            authenticate($secretKey);
            require __DIR__ . '/../includes/workers.php';
            break;

        case ($request === '/api/received-response'):
        case ($request === '/api/emails'):
        case (strpos($request, '/api/emails') === 0):
            authenticate($secretKey);
            require __DIR__ . '/../app/received_response.php';
            break;

        case (preg_match('#^/api/master/smtps/(\d+)/accounts/(\d+)$#', $request, $m) ? true : false):
            authenticate($secretKey);
            $_GET['smtp_server_id'] = $m[1];
            $_GET['account_id']     = $m[2];
            require __DIR__ . '/../includes/smtp_accounts.php';
            break;

        case (preg_match('#^/api/master/smtps/(\d+)/accounts$#', $request, $m) ? true : false):
            authenticate($secretKey);
            $_GET['smtp_server_id'] = $m[1];
            require __DIR__ . '/../includes/smtp_accounts.php';
            break;

        default:
            // If none of the above matched AND we didn't already exit in earlier handlers:
            // Only 404 for non-?endpoint handlers
            if (!$endpoint) {
                send_json(['error' => 'Endpoint not found'], 404);
            }
            // else, we already handled ?endpoint= routes earlier (or they were invalid)
            send_json(['error' => 'Endpoint not found'], 404);
    }
} catch (Exception $e) {
    send_json(['error' => $e->getMessage()], 500);
}
