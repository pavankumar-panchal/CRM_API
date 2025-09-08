<?php
// Temporary helper to create a user in the database for testing.
require_once __DIR__ . '/config/db.php';

$name = 'Pavan';
$email = 'panchalpavan801@gmail.com';
$password = 'Pavan@786';
$hashed = password_hash($password, PASSWORD_BCRYPT);
$stmt = $conn->prepare("INSERT INTO users (name,email,password) VALUES (?,?,?)");
if (!$stmt) {
    echo "Prepare failed: " . $conn->error . PHP_EOL;
    exit(1);
}
$stmt->bind_param('sss', $name, $email, $hashed);
if ($stmt->execute()) {
    echo "User created with id: " . $stmt->insert_id . PHP_EOL;
} else {
    echo "Insert failed: " . $stmt->error . PHP_EOL;
}
$stmt->close();
$conn->close();
?>
