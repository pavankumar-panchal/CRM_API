<?php
require_once __DIR__ . '/config/db.php';

$id = 2;
$password = 'Pavan@786';
$hashed = password_hash($password, PASSWORD_BCRYPT);
$stmt = $conn->prepare('UPDATE users SET password = ? WHERE id = ?');
$stmt->bind_param('si', $hashed, $id);
if (!$stmt->execute()) {
    echo "Update failed: " . $stmt->error . PHP_EOL;
    exit(1);
}
echo "Password updated for user id $id\n";
$stmt->close();
$conn->close();
?>
