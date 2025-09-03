<?php
// filepath: /opt/lampp/htdocs/CRM_API/backend/public/fetch.php

session_start();

header('Content-Type: application/json');

// Print all session data
echo json_encode([
    "status" => "success",
    "session" => $_SESSION
]);
exit;