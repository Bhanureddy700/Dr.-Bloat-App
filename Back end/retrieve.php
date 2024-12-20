<?php
// Database connection parameters
require_once 'config.php';

// Retrieve user ID from the request URL
$userId = $_GET['userId'];

// Prepare SQL query to fetch user image path from image table
$sql_image = "SELECT image FROM patient WHERE userid = '$userId'";
$result_image = $conn->query($sql_image);

$response = array();

if ($result_image) {
    // Check if there is a result
    if ($result_image->num_rows > 0) {
        // User image found, fetch image path
        $row_image = $result_image->fetch_assoc();
        $imagePath = $row_image['image'];
        
        // Append base URL to image path
        $fullImagePath = $base_url . $imagePath;

        // Store the modified image path in the response
        $response['image'] = $fullImagePath;

        // Log the image URI
        error_log("Image URI: " . $fullImagePath);
    } else {
        // User image not found
        $response['image'] = "";
    }
} else {
    // Error in executing the SQL query
    $response['error'] = "Error executing SQL query: " . $conn->error;
}

// Close connection
$conn->close();

// Return response as JSON
header('Content-Type: application/json');
echo json_encode($response);
?>
