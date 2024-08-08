<?php
require __DIR__ . '/vendor/autoload.php';

use Firebase\JWT\JWT;

error_reporting(E_ALL);
ini_set('display_error', 1);
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$db_conn = mysqli_connect('localhost', 'root', '', 'scheduler');
if ($db_conn === false) {
    die('Error: ' . mysqli_connect_error());
}
$method = $_SERVER['REQUEST_METHOD'];

$secretKey = 'your-secret-key'; // Replace with your own secret key

function generateJWT($user_id, $user_role)
{
    global $secretKey;
    $issuedAt = time();
    $expirationTime = $issuedAt + 3600; // jwt valid for 1 hour
    $payload = array(
        'iat' => $issuedAt,
        'exp' => $expirationTime,
        'sub' => $user_id,
        'role' => $user_role
    );
    return JWT::encode($payload, $secretKey, 'HS256');
}

switch ($method) {
    case 'POST':
        $auth_data = json_decode(file_get_contents('php://input'));
        // echo print_r($auth_data);
        // die;
        if (isset($auth_data->username) && isset($auth_data->password)) {
            $user_name = $auth_data->username;
            $password = $auth_data->password;

            $user_data = mysqli_query($db_conn, "SELECT * FROM tbl_user WHERE user_name = '$user_name' AND password = '$password'");
            if (mysqli_num_rows($user_data) > 0) {
                while ($user_row = mysqli_fetch_array($user_data)) {
                    $user_id = $user_row['user_id'];
                    $user_role = $user_row['user_role'];
                }
            } else {
                echo json_encode(['fail' => 'Incorrect usernam or password']);
                return;
            }

            $token = generateJWT($user_id, $user_role);
            echo json_encode(['token' => $token, 'role' => $user_role]);
        }

        break;
}
