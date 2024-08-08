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

$jwt = str_replace('Bearer ', '', $headers['Authorization']);
$decoded = JWT::decode($jwt, new Key('your-secret-key', 'HS256'));
$logged_user_id = $decoded->sub;

switch ($method) {
    case 'GET':
        $user_ids = isset($_GET['user_ids']) ? $_GET['user_ids'] : null;

        if ($user_ids) {
            // Sanitize and prepare the user IDs for SQL query
            $user_ids = array_map('intval', explode(',', $user_ids));
            $user_ids_list = implode(',', $user_ids);

            $query = "SELECT a.id, a.subject, a.start_time, a.end_time, a.description,
                             GROUP_CONCAT(au.user_id) as user_ids
                             FROM appointments a
                             LEFT JOIN appointment_users au ON a.id = au.appointment_id
                             WHERE au.user_id IN ($user_ids_list)
                             GROUP BY a.id";
        } else {
            $query = "SELECT a.id, a.subject, a.start_time, a.end_time, a.description,
                          GROUP_CONCAT(au.user_id) as user_ids
                          FROM appointments a
                          LEFT JOIN appointment_users au ON a.id = au.appointment_id
                          WHERE au.user_id = $logged_user_id
                          GROUP BY a.id";
        }

        $result = mysqli_query($db_conn, $query);
        if (!$result) {
            die("Query failed: " . mysqli_error($db_conn));
        }

        // Fetch and format the data
        $formattedAppointments = [];
        while ($row = mysqli_fetch_assoc($result)) {
            $userIds = array_map('intval', explode(',', $row['user_ids']));
            $formattedAppointments[] = [
                'Id' => (int) $row['id'],
                'Subject' => $row['subject'],
                'StartTime' => $row['start_time'],
                'EndTime' => $row['end_time'],
                'OwnerId' => $userIds
            ];
        }

        $response = [
            '@odata.context' => "http://localhost/final/scheduler/api/appointment.php",
            'value' => $formattedAppointments
        ];

        echo json_encode($response);

        break;

    case 'POST':
        $input = json_decode(file_get_contents('php://input'), true);

        if (!empty($input)) {
            $appointment = $input[0]; // Assuming all appointments have the same details except OwnerId
            $subject = $appointment['Subject'] ?? '';
            $start_time = $appointment['StartTime'] ?? '';
            $end_time = $appointment['EndTime'] ?? '';
            $description = $appointment['Description'] ?? '';
            $owner_ids = array_column($input, 'OwnerId'); // Extract all OwnerIds

            // Convert UTC times to Asia/Bangkok timezone
            $startDate = new DateTime($start_time, new DateTimeZone('UTC'));
            $startDate->setTimezone(new DateTimeZone('Asia/Bangkok'));
            $start_time_bangkok = $startDate->format('Y-m-d H:i:s');

            $endDate = new DateTime($end_time, new DateTimeZone('UTC'));
            $endDate->setTimezone(new DateTimeZone('Asia/Bangkok'));
            $end_time_bangkok = $endDate->format('Y-m-d H:i:s');

            // Validate required fields
            if (empty($subject) || empty($start_time) || empty($end_time) || empty($owner_ids)) {
                http_response_code(400);
                echo json_encode(['error' => 'Invalid input']);
                exit;
            }

            // Insert the appointment into the appointments table
            $stmt = $db_conn->prepare("INSERT INTO appointments (subject, start_time, end_time, description) VALUES (?, ?, ?, ?)");
            $stmt->bind_param("ssss", $subject, $start_time_bangkok, $end_time_bangkok, $description);

            if ($stmt->execute()) {
                $appointment_id = $stmt->insert_id;

                // Insert owner_ids into the appointment_users table
                $stmt = $db_conn->prepare("INSERT INTO appointment_users (appointment_id, user_id) VALUES (?, ?)");

                foreach ($owner_ids as $owner_id) {
                    $stmt->bind_param("ii", $appointment_id, $owner_id);
                    $stmt->execute();
                }

                echo json_encode(['success' => true, 'appointment_id' => $appointment_id]);
            } else {
                http_response_code(500);
                echo json_encode(['error' => 'Database error']);
            }
        } else {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid input']);
        }
        break;

    case 'PUT':
        $input = json_decode(file_get_contents('php://input'), true);

        if (!empty($input)) {
            $appointment = $input[0]; // Assuming all appointments have the same details except OwnerId
            $id = $appointment['Id'] ?? '';
            $subject = $appointment['Subject'] ?? '';
            $start_time = $appointment['StartTime'] ?? '';
            $end_time = $appointment['EndTime'] ?? '';
            $description = $appointment['Description'] ?? '';
            $owner_ids = array_column($input, 'OwnerId'); // Extract all OwnerIds

            // Convert UTC times to Asia/Bangkok timezone
            $startDate = new DateTime($start_time, new DateTimeZone('UTC'));
            $startDate->setTimezone(new DateTimeZone('Asia/Bangkok'));
            $start_time_bangkok = $startDate->format('Y-m-d H:i:s');

            $endDate = new DateTime($end_time, new DateTimeZone('UTC'));
            $endDate->setTimezone(new DateTimeZone('Asia/Bangkok'));
            $end_time_bangkok = $endDate->format('Y-m-d H:i:s');

            // Validate required fields
            if (empty($id) || empty($subject) || empty($start_time) || empty($end_time) || empty($owner_ids)) {
                http_response_code(400);
                echo json_encode(['error' => 'Invalid input']);
                exit;
            }

            // Update the appointment in the appointments table
            $stmt = $db_conn->prepare("UPDATE appointments SET subject = ?, start_time = ?, end_time = ?, description = ? WHERE id = ?");
            $stmt->bind_param("ssssi", $subject, $start_time_bangkok, $end_time_bangkok, $description, $id);

            if ($stmt->execute()) {
                // Delete old owner_ids from the appointment_users table
                $stmt = $db_conn->prepare("DELETE FROM appointment_users WHERE appointment_id = ?");
                $stmt->bind_param("i", $id);
                $stmt->execute();

                // Insert new owner_ids into the appointment_users table
                $stmt = $db_conn->prepare("INSERT INTO appointment_users (appointment_id, user_id) VALUES (?, ?)");

                foreach ($owner_ids as $owner_id) {
                    $stmt->bind_param("ii", $id, $owner_id);
                    $stmt->execute();
                }

                echo json_encode(['success' => true, 'appointment_id' => $id]);
            } else {
                http_response_code(500);
                echo json_encode(['error' => 'Database error']);
            }
        } else {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid input']);
        }
        break;

    case 'DELETE':
        $input = json_decode(file_get_contents('php://input'), true);

        if (!empty($input)) {
            $appointment = $input[0]; // Assuming all appointments have the same details except OwnerId
            $id = $appointment['Id'] ?? '';

            // Insert the appointment into the appointments table
            $stmt = $db_conn->prepare("DELETE FROM appointments WHERE id = $id");

            if ($stmt->execute()) {
                echo json_encode(['success' => true, 'appointment_id' => $id]);
            } else {
                http_response_code(500);
                echo json_encode(['error' => 'Database error']);
            }
        } else {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid input']);
        }
        break;
}
