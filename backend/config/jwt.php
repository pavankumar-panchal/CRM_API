<?php
// Shared JWT helpers
require_once __DIR__ . '/db.php';
require_once __DIR__ . '/../vendor/autoload.php';
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

function create_jwt($payload) {
    global $jwt_config;
    $now = time();
    $token = array(
        'iss' => $jwt_config['issuer'],
        'iat' => $now,
        'exp' => $now + $jwt_config['expire'],
        'data' => $payload
    );
    return JWT::encode($token, $jwt_config['secret'], 'HS256');
}

function decode_jwt_from_header() {
    $headers = null;
    if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
        $headers = trim($_SERVER['HTTP_AUTHORIZATION']);
    } elseif (function_exists('apache_request_headers')) {
        $requestHeaders = apache_request_headers();
        if (!empty($requestHeaders['Authorization'])) {
            $headers = trim($requestHeaders['Authorization']);
        } elseif (!empty($requestHeaders['authorization'])) {
            $headers = trim($requestHeaders['authorization']);
        }
    }
    if (!$headers) return null;
    if (preg_match('/Bearer\s+(.*)$/i', $headers, $matches)) {
        $jwt = $matches[1];
        try {
            $decoded = JWT::decode($jwt, new Key($GLOBALS['jwt_config']['secret'], 'HS256'));
            return $decoded->data ?? null;
        } catch (Exception $e) {
            return null;
        }
    }
    return null;
}

?>