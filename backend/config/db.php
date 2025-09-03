<?php
error_reporting(0);
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
    'secret' => 'change_this_to_a_strong_secret',
    'issuer' => 'CRM_API',
    'expire' => 24 * 60 * 60 // 1 day
];
?>
