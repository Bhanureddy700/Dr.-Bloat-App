<?php
require_once 'config.php';

// Assuming you receive the patient ID via GET request
$patientId = $_GET['userId']; // Use 'userId' instead of 'patientId'

$sql = "SELECT userid, name, age, gender,address FROM patient WHERE userid = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $patientId);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    // Output data of the first (and hopefully only) row
    $row = $result->fetch_assoc();
    echo json_encode($row);
} else {
    echo json_encode(["error" => "No user found"]); // Return a JSON object for consistency
}

$stmt->close();
$conn->close();
?>
