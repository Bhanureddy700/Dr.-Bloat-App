<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

// Database connection parameters
require 'config.php';

// Check if doctorName is set via POST request
if (!isset($_POST['doctorName'])) {
    echo json_encode(array("success" => false, "error" => "doctorName is required"));
    exit;
}

// Get the doctorName from the POST request
$doctorName = $_POST['doctorName'];

// Use prepared statement to insert the doctor name safely
$sql = $conn->prepare("INSERT INTO admin (DTID) VALUES (?)");
$sql->bind_param("s", $doctorName);

$response = array();

if ($sql->execute()) {
    $response['success'] = true;
} else {
    $response['success'] = false;
    $response['error'] = $sql->error; // Log specific SQL error for debugging
}

// Close connection
$sql->close();
$conn->close();

// Return response as JSON
echo json_encode($response);
?>
