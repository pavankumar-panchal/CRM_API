<?php
// ====== BOOTSTRAP ======

// --- CORS: reflect allowed Origin, allow credentials and preflight
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
    // Fallback to allow all (useful for non-production or when origin not matched)
    header('Access-Control-Allow-Origin: *');
}

header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, X-Requested-With, Authorization, Accept');
header('Access-Control-Expose-Headers: Authorization');
header('Access-Control-Max-Age: 600');

// Handle CORS preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// Secure session cookie settings

// Note: sessions removed in favor of JWT-based stateless authentication


// ====== HELPERS ======
function send_json($data, $code = 200) {
    http_response_code($code);
    header('Content-Type: application/json');
    echo json_encode($data);
    exit;
}

// Function to normalize email (decode %40 and fix gamil.com typo)
function normalizeEmail($email) {
    // Decode URL-encoded characters (e.g., %40 to @)
    $email = urldecode(trim($email));
    // Fix gamil.com typo to gmail.com
    if (stripos($email, '@gamil.com') !== false) {
        $email = str_ireplace('@gamil.com', '@gmail.com', $email);
    }
    return $email;
}

// Sessions removed. Use JWT for stateless auth.

require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../config/jwt.php';

// ====== ROUTING SETUP ======
$endpoint = $_GET['endpoint'] ?? null;
$fullPath = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$basePath = str_replace('\\', '/', $_SERVER['SCRIPT_NAME']);
$request = str_replace($basePath, '', $fullPath);
$request = preg_replace('/\?.*/', '', $request);
$request = rtrim($request, '/');
$method = $_SERVER['REQUEST_METHOD'];

// ====== ENDPOINTS ======

// --- Registration
if ($method === 'POST' && $endpoint === 'register') {
    $input = json_decode(file_get_contents('php://input'), true);
    $name = trim($input['name'] ?? '');
    $email = normalizeEmail($input['email'] ?? '');
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
    $stmt->close();
}

// --- Login
if ($method === 'POST' && $endpoint === 'login') {
    $input = json_decode(file_get_contents('php://input'), true);
    $email = normalizeEmail($input['email'] ?? '');
    $password = $input['password'] ?? '';

    if (!$email || !$password) {
        send_json(['status' => 'error', 'message' => 'Email and password are required'], 400);
    }
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        send_json(['status' => 'error', 'message' => 'Invalid email format'], 400);
    }

    // Fetch user ID, name, email, and password where email matches
    $stmt = $conn->prepare("SELECT id, name, email, password FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result->num_rows === 0) {
        send_json(['status' => 'error', 'message' => 'Invalid credentials'], 401);
    }

    $user = $result->fetch_assoc();
    $user_id = $user['id'];
    $name = $user['name'];
    $email_db = $user['email'];
    $hashed = $user['password'];

    if (!password_verify($password, $hashed)) {
        send_json(['status' => 'error', 'message' => 'Invalid credentials'], 401);
    }

    // Create JWT token with basic user info
    $token = create_jwt([
        'id' => $user_id,
        'name' => $name,
        'email' => $email_db
    ]);

    send_json([
        'status' => 'success',
        'message' => 'Login successful',
        'token' => $token,
        'user' => [
            'id' => $user_id,
            'name' => $name,
            'email' => $email_db
        ]
    ]);
    $stmt->close();
}

// --- Check auth
if ($method === 'GET' && $endpoint === 'check-auth') {
    $data = decode_jwt_from_header();
    if (!$data) {
        send_json(['status' => 'error', 'message' => 'Not authenticated'], 401);
    } else {
        send_json(['status' => 'success', 'user' => [
            'id' => $data->id ?? null,
            'name' => $data->name ?? null,
            'email' => $data->email ?? null,
        ]]);
    }
}

// --- Logout
if ($method === 'POST' && $endpoint === 'logout') {
    // For JWT stateless auth, logout is handled client-side by deleting the token.
    // Optionally implement a token blacklist in DB to invalidate tokens before expiry.
    send_json(['status' => 'success', 'message' => 'Logged out (client should delete stored token)']);
}

// --- Routes (Authentication Removed)
try {
    switch (true) {
        case ($request === '/api/upload'):
            require __DIR__ . '/../public/email_processor.php';
            break;

        case ($request === '/api/results'):
            require __DIR__ . '/../includes/get_results.php';
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
            if (!$endpoint) {
                send_json(['status' => 'error', 'message' => 'Endpoint not found'], 404);
            }
            send_json(['status' => 'error', 'message' => 'Endpoint not found'], 404);
    }
} catch (Exception $e) {
    send_json(['status' => 'error', 'message' => $e->getMessage()], 500);
}
?>