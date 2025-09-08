<?php
// Temporary helper to generate a JWT using the project's helpers.
require_once __DIR__ . '/config/db.php';
require_once __DIR__ . '/config/jwt.php';
// Build payload for the requested user
$payload = [
    'id' => 1,
    'name' => 'Pavan',
    'email' => 'panchalpavan801@gmail.com'
];
$token = create_jwt($payload);
echo $token . PHP_EOL;
?>
