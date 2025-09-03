<?php
// filepath: /opt/lampp/htdocs/CRM_API/backend/public/fetch.php

require_once __DIR__ . '/../config/jwt.php';
header('Content-Type: application/json');
$data = decode_jwt_from_header();
if ($data) {
    echo json_encode([
        "status" => "success",
        "logged_in" => true,
        "user" => [
            "id"    => $data->id ?? null,
            "name"  => $data->name ?? null,
            "email" => $data->email ?? null,
        ]
    ]);
} else {
    echo json_encode([
        "status" => "success",
        "logged_in" => false,
        "message" => "No user is currently logged in."
    ]);
}