<?php
// Assuming you're using MySQL, adjust accordingly if you're using a different database
require_once 'config.php';
// Retrieve user ID from the request URL
$userId = $_GET['userId'];

// Prepare SQL query to fetch user details based on user ID
$sql = "SELECT userid, name, mobile, gender, image FROM doctor WHERE userid = '$userId'";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // User found, fetch user details
    $row = $result->fetch_assoc();
    
    // Close connection
    $conn->close();
    
    // Read image data
    $imageData = base64_encode(file_get_contents($row['image']));
    $imageSrc = 'data:image/jpeg;base64,' . $imageData;
    
    // Add image source to user details array
    $row['image'] = $imageSrc;
    
    // Return user details as JSON response
    header('Content-Type: application/json');
    echo json_encode($row);
} else {
    // User not found
    $response = array("status" => "error", "message" => "User not found");
    echo json_encode($response);
}
?>
