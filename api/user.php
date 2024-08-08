<?php
require __DIR__ . '/vendor/autoload.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once(__DIR__ . '/secure.php');

$db_conn = mysqli_connect('localhost', 'root', '', 'scheduler');
if ($db_conn === false) {
    die('Error: ' . mysqli_connect_error());
}
$method = $_SERVER['REQUEST_METHOD'];

$decoded = JWT::decode($jwt, new Key('your-secret-key', 'HS256'));
$logged_user_id = $decoded->sub;
$logged_user_role = $decoded->role;

switch ($method) {
    case 'GET':
        $uri = explode('/', $_SERVER['REQUEST_URI']);
        $is_current = end($uri);

        if ($is_current === 'current') {
            // Fetch the current logged-in user
            $jwt = str_replace('Bearer ', '', $headers['Authorization']);
            try {
                $user_data = mysqli_query($db_conn, "SELECT user_id, user_name, color FROM tbl_user WHERE user_id = '$logged_user_id'");
                if ($user_row = mysqli_fetch_array($user_data)) {
                    $json_array['userData'] = array(
                        'OwnerText' => $user_row['user_name'],
                        'Id' => $user_row['user_id'],
                        'OwnerColor' => $user_row['color'],
                    );
                    echo json_encode($json_array['userData']);
                    exit();
                } else {
                    echo json_encode(['error' => 'User not found']);
                }
            } catch (Exception $e) {
                http_response_code(401);
                echo json_encode(['error' => 'Unauthorized']);
            }
        }

        $param_id = explode('/', $_SERVER['REQUEST_URI'])[count(explode('/', $_SERVER['REQUEST_URI'])) - 1];
        if (isset($param_id) && is_numeric($param_id)) {
            $json_array = array();
            $user_id = $param_id;
            $user_data = mysqli_query($db_conn, "SELECT * FROM tbl_user WHERE user_id = '$user_id'");
            while ($user_row = mysqli_fetch_array($user_data)) {
                $json_array['userData'] = array(
                    'id' => $user_row['user_id'],
                    'username' => $user_row['user_name'],
                    'email' => $user_row['user_email']
                );
                echo json_encode($json_array['userData']);
            }
        } else {
            $all_user = mysqli_query($db_conn, 'SELECT * FROM tbl_user');
            if (mysqli_num_rows($all_user) > 0) {
                while ($row = mysqli_fetch_array($all_user)) {
                    $json_array['userData'][] = array(
                        'id' => $row['user_id'],
                        'username' => $row['user_name'],
                        'email'    => $row['user_email'],
                        'color'    => $row['color']
                    );
                }
                echo json_encode($json_array['userData']);
                return;
            } else {
                echo json_encode(['result' => 'Recheck data']);
                return;
            }
        }
        break;
    case 'POST':
        $user_post_data = json_decode(file_get_contents('php://input'));
        $user_name = $user_post_data->username;
        $user_email = $user_post_data->email;
        $password = $user_post_data->password;

        $hashed_password = password_hash($password, PASSWORD_BCRYPT);

        function generateRandomColor()
        {
            return '#' . str_pad(dechex(mt_rand(0, 0xFFFFFF)), 6, '0', STR_PAD_LEFT);
        }

        $random_color = generateRandomColor();

        $query = "INSERT INTO tbl_user (user_name, user_email, password, color) VALUES ('$user_name', '$user_email', '$hashed_password', '$random_color');";
        $result = mysqli_query($db_conn, $query);

        if ($result) {
            echo json_encode(['success' => 'User added successfully']);
            return;
        } else {
            echo json_encode(['fail' => 'recheck user data']);
            return;
        }

        break;
    case 'PUT':
        $user_update_data = json_decode(file_get_contents('php://input'));
        $user_id = $user_update_data->id;
        $user_name = $user_update_data->username;
        $user_email = $user_update_data->email;

        $query = "UPDATE tbl_user SET user_name = '$user_name', user_email = '$user_email' WHERE user_id = '$user_id'";
        $result = mysqli_query($db_conn, $query);

        if ($result) {
            echo json_encode(['success' => 'User update successfully']);
            return;
        } else {
            echo json_encode(['fail' => 'recheck user data']);
            return;
        }

        break;
    case 'DELETE':
        $param_id = explode('/', $_SERVER['REQUEST_URI'])[count(explode('/', $_SERVER['REQUEST_URI'])) - 1];
        if (isset($param_id) && is_numeric($param_id)) {
            $user_id = $param_id;

            $query = "DELETE FROM tbl_user WHERE user_id = '$user_id'";

            $result = mysqli_query($db_conn, $query);

            if ($result) {
                echo json_encode(['success' => 'Delete user successfully']);
                return;
            } else {
                echo json_encode(['fail' => 'Fail to delete user data']);
                return;
            }
        }

        break;
}
