<?php
require 'vendor/autoload.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

$secretKey = 'your-secret-key';

function validateJWT($jwt)
{
    global $secretKey;
    try {
        $decoded = JWT::decode($jwt, new Key($secretKey, 'HS256'));
        return (array) $decoded;
    } catch (Exception $e) {
        return false;
    }
}

$headers = apache_request_headers();

if (isset($headers['Authorization'])) {
    $jwt = str_replace('Bearer ', '', $headers['Authorization']);
    $decoded = validateJWT($jwt);
    if (!$decoded) {
        http_response_code(401);
        echo json_encode(['fail' => 'Access denied']);
        exit();
    }
} else {
    http_response_code(400);
    echo json_encode(['fail' => 'No token provided']);
    exit();
}
