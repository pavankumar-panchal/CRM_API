<?php
// filepath: /opt/lampp/htdocs/CRM_API/backend/public/fetch.php

session_start();

header('Content-Type: application/json');

if (isset($_SESSION['user_id']) && isset($_SESSION['user_name']) && isset($_SESSION['user_email'])) {
    echo json_encode([
        "status" => "success",
        "logged_in" => true,
        "user" => [
            "id"    => $_SESSION['user_id'],
            "name"  => $_SESSION['user_name'],
            "email" => $_SESSION['user_email'],
        ],
        "session" => $_SESSION
    ]);
} else {
    echo json_encode([
        "status" => "success",
        "logged_in" => false,
        "message" => "No user is currently logged in.",
        "session" => $_SESSION
    ]);
}