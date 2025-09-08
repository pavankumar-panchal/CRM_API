<?php
// Serve the OpenAPI JSON with CORS headers so browser-based Swagger UI can load it from a different port.
header('Content-Type: application/json');

$origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';
if ($origin) {
    // Allow localhost origins and any port on localhost
    if (preg_match('#^https?://localhost(:[0-9]+)?$#', $origin)) {
        header("Access-Control-Allow-Origin: $origin");
    } else {
        // Fallback to wildcard for other origins
        header('Access-Control-Allow-Origin: *');
    }
} else {
    header('Access-Control-Allow-Origin: *');
}
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Access-Control-Max-Age: 600');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$path = __DIR__ . '/openapi.json';
if (is_readable($path)) {
    readfile($path);
    exit;
}
http_response_code(404);
echo json_encode(['error' => 'openapi.json not found']);
