<?php
// Allow from any origin
if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400'); // cache for 1 day
}

// Access-Control headers are received during OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'])) {
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    }

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS'])) {
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
    }

    exit(0);
}

// Database connection parameters
require_once 'config.php'; // This should include $conn (your DB connection)

// Check if userid and password are set via POST request
if (!isset($_POST['userid']) || !isset($_POST['password'])) {
    die(json_encode(array("status" => "error", "message" => "Invalid request: userid and password are required")));
}

// Extract data from POST
$userid = $_POST['userid'];
$password = $_POST['password'];

// Prepare an SQL query using prepared statements
$sql = "SELECT * FROM doctor WHERE userid = ? AND password = ?";

if ($stmt = $conn->prepare($sql)) {
    // Bind the parameters (s = string, one for each ? in the query)
    $stmt->bind_param("ss", $userid, $password);

    // Execute the statement
    $stmt->execute();

    // Store the result
    $stmt->store_result();

    // Check if the login is successful
    if ($stmt->num_rows > 0) {
        // Login successful
        echo json_encode(array("status" => "success"));
    } else {
        // Login failed
        echo json_encode(array("status" => "failed", "message" => "Incorrect username or password"));
    }

    // Close the statement
    $stmt->close();
} else {
    // Query preparation failed
    die(json_encode(array("status" => "error", "message" => "Query preparation failed")));
}

// Close the connection
$conn->close();
?>