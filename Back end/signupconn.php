<?php
// Database connection parameters
require_once 'config.php';

// Retrieve POST data
$userid = $_POST['userid'] ?? null;
$password = $_POST['password'] ?? null;
$name = $_POST['name'] ?? null;
$mobile = $_POST['mobile'] ?? null;
$age = $_POST['age'] ?? null;
$gender = $_POST['gender'] ?? null;
$address = $_POST['address'] ?? null;
$doctorId = $_POST['doctorId'] ?? null;

// Check if login data is provided
if ($userid && $password) {
    // SQL query to check login credentials
    $stmt = $conn->prepare("SELECT * FROM patient WHERE userid = ? AND password = ?");
    $stmt->bind_param("ss", $userid, $password);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        // Login successful
        echo json_encode(array("status" => "success"));
    } else {
        // Login failed, check if it's a registration request
        if ($name && $mobile && $age && $gender && $address && $doctorId) {
            // SQL query to insert data into the database (patient table)
            $stmt = $conn->prepare("INSERT INTO patient (userid, name, password, mobile, age, gender, address, doctorId) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
            $stmt->bind_param("ssssssss", $userid, $name, $password, $mobile, $age, $gender, $address, $doctorId);

            if ($stmt->execute()) {
                echo json_encode(array("status" => "success"));
            } else {
                echo json_encode(array("status" => "error", "message" => "Error: " . $stmt->error));
            }
        } else {
            // Invalid request data
            echo json_encode(array("status" => "error", "message" => "Invalid request data"));
        }
    }

    // Close the statement
    $stmt->close();
} else {
    // Missing login data
    echo json_encode(array("status" => "error", "message" => "User ID and password are required"));
}

// Close connection
$conn->close();
?>
