<?php
// Database connection parameters
require_once 'config.php';

// Prepare SQL query to fetch all DTID
$sql = "SELECT DTID FROM admin";
$result = $conn->query($sql);

$response = array();

if ($result->num_rows > 0) {
    // Fetch all DTID and add to response array
    while($row = $result->fetch_assoc()) {
        $response[] = $row;
    }
}

// Close connection
$conn->close();

// Return response as JSON
header('Content-Type: application/json');
echo json_encode($response);
?>
