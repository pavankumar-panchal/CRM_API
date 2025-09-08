<?php
// Temporary helper to generate a JWT for id=2 using the project's helpers.
require_once __DIR__ . '/config/db.php';
require_once __DIR__ . '/config/jwt.php';
// Payload for id 2
$payload = [
    'id' => 2,
    'name' => 'User2',
    'email' => 'user2@example.com'
];
$token = create_jwt($payload);
echo $token . PHP_EOL;
?>
