<?php
// Database connection parameters
require_once 'config.php';

// Retrieve user ID from the request URL
$userId = $_GET['userId'];

// Prepare SQL query to fetch user details based on user ID
$sql = "SELECT userid, name, mobile, gender, age, address FROM patient WHERE userid = '$userId'";

$result = $conn->query($sql);

$response = array();

if ($result->num_rows > 0) {
    // User found, fetch user details
    $row = $result->fetch_assoc();
    
    // Close connection
    $conn->close();
    
    // Return user details as JSON response
    header('Content-Type: application/json');
    echo json_encode($row);
} else {
    // User not found
    $response = array("status" => "error", "message" => "User not found");
    echo json_encode($response);
}
?>
