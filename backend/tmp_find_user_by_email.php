<?php
require_once __DIR__ . '/config/db.php';

$email = 'panchalpavan801@gmail.com';
$stmt = $conn->prepare('SELECT id, name, email FROM users WHERE email = ?');
$stmt->bind_param('s', $email);
$stmt->execute();
$res = $stmt->get_result();
if ($res->num_rows === 0) {
    echo "User not found: $email\n";
    exit(1);
}
$user = $res->fetch_assoc();
echo "Found user:\n";
echo "id: " . $user['id'] . "\n";
echo "name: " . $user['name'] . "\n";
echo "email: " . $user['email'] . "\n";
$stmt->close();
$conn->close();
?>
