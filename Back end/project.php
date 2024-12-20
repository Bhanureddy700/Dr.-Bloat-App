<?php
// Allow from any origin
if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');    // cache for 1 day
}

// Access-Control headers are received during OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

    exit(0);
}

// Database connection parameters
require_once 'config.php';

// Retrieve login data from POST request
$data = json_decode(file_get_contents("php://input"));

// Check if data is valid JSON
if ($data === null && json_last_error() !== JSON_ERROR_NONE) {
    die(json_encode(array("status" => "error", "message" => "Invalid JSON data")));
}

// Check if userid and password are set
if (!isset($data->userid) || !isset($data->password)) {
    die(json_encode(array("status" => "error", "message" => "Invalid request: userid and password are required")));
}

// Extract data
$userid = $conn->real_escape_string($data->userid); // Prevent SQL injection
$password = $conn->real_escape_string($data->password);

// SQL query to check login credentials
$sql = "SELECT * FROM patient WHERE userid = '$userid' AND password = '$password'";

$result = $conn->query($sql);

if ($result === false) {
    die(json_encode(array("status" => "error", "message" => "Query execution failed: " . $conn->error)));
}

if ($result->num_rows > 0) {
    // Login successful
    echo json_encode(array("status" => "success"));
} else {
    // Login failed
    echo json_encode(array("status" => "failed"));
}

// Close connection
$conn->close();
?>
