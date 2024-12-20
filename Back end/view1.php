<?php
require_once 'config.php'; // Ensure this matches your actual database name

// Step 1: Execute query to fetch top ten user IDs
$query = "SELECT userid, image FROM patient ORDER BY userid"; // Change this query according to your criteria

// Prepare and execute the query using MySQLi
$stmt = $conn->prepare($query);

if ($stmt === false) {
    die(json_encode(array("status" => "error", "message" => "Failed to prepare the statement: " . $conn->error)));
}

if (!$stmt->execute()) {
    die(json_encode(array("status" => "error", "message" => "Query execution failed: " . $stmt->error)));
}

$result = $stmt->get_result();
$topUsers = $result->fetch_all(MYSQLI_ASSOC);

// Append base URL to image path
foreach ($topUsers as &$user) {
    if (!empty($user['image'])) {
        $user['image'] = $base_url . $user['image'];
    }
}

// Close the statement and connection
$stmt->close();
$conn->close();

// Step 2: Return JSON response
header('Content-Type: application/json');
echo json_encode($topUsers);
?>
