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
        // Allow configured test tokens to act as universal auth for testing
        $cfg = $GLOBALS['jwt_config'];
        // legacy single token
        if (!empty($cfg['test_token']) && hash_equals($cfg['test_token'], $jwt)) {
            return (object)['id' => 0, 'name' => 'dev', 'email' => 'dev@example.com'];
        }
        // multiple tokens list
        if (!empty($cfg['test_tokens']) && is_array($cfg['test_tokens'])) {
            foreach ($cfg['test_tokens'] as $t) {
                if ($t !== '' && hash_equals($t, $jwt)) {
                    // map token to user if mapping provided
                    if (!empty($cfg['test_token_map']) && is_array($cfg['test_token_map']) && !empty($cfg['test_token_map'][$jwt])) {
                        return (object)$cfg['test_token_map'][$jwt];
                    }
                    return (object)['id' => 0, 'name' => 'test', 'email' => 'test@example.com'];
                }
            }
        }
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