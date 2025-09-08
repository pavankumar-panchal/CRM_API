<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
$dbConfig = [
    'host' => '127.0.0.1',
    'username' => 'root',
    'password' => '',
    'name' => 'CRM_API',
    'port' => 3306
];
$conn = new mysqli($dbConfig['host'], $dbConfig['username'], $dbConfig['password'], $dbConfig['name'], $dbConfig['port']);
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Database connection failed']);
    exit;
}

// JWT configuration - change the secret to a strong value in production
$jwt_config = [
    // Use environment variable if provided (do NOT commit production secrets)
    'secret' => getenv('JWT_SECRET') ?: 'change_this_to_a_strong_secret',
    'issuer' => 'CRM_API',
    'expire' => 24 * 60 * 60, // 1 day
    // Optional single test/dev token (legacy)
    'test_token' => getenv('TEST_AUTH_TOKEN') ?: null,
    // Optional multiple test tokens (comma-separated). Use TEST_AUTH_TOKENS="token1,token2"
    'test_tokens' => array_values(array_filter(array_map('trim', explode(',', getenv('TEST_AUTH_TOKENS') ?: '')))),
    // Optional JSON mapping of token -> user payload. Example: TEST_AUTH_MAP='{"devtoken123":{"id":1,"name":"Alice","email":"alice@example.com"}}'
    'test_token_map' => (function(){ $m = getenv('TEST_AUTH_MAP'); return $m ? json_decode($m, true) : null; })(),
    // If ALLOW_DEV_LOGIN=1 in environment, a /routes/api.php?endpoint=dev-login endpoint will return a JWT for testing
    'allow_dev_login' => getenv('ALLOW_DEV_LOGIN') === '1'
];
?>
