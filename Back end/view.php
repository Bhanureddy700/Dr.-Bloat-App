<?php
require_once 'config.php';

// Get the userid from the query parameters
$userid = isset($_GET['userid']) ? $_GET['userid'] : null;

// Validate the userid parameter
if ($userid === null) {
    die("Missing or invalid userid parameter.");
}

// Modify the query to filter by doctorId
$query = "SELECT userid, image FROM patient WHERE doctorId = ? ORDER BY userid";

// Prepare and execute the query using MySQLi
$stmt = $conn->prepare($query);

if ($stmt === false) {
    die("Failed to prepare the statement: " . $conn->error);
}

$stmt->bind_param('s', $userid);

if (!$stmt->execute()) {
    die("Query execution failed: " . $stmt->error);
}

$result = $stmt->get_result();
$topUsers = $result->fetch_all(MYSQLI_ASSOC);

// Append base URL to image path
foreach ($topUsers as &$user) {
    if ($user['image']) {
        $user['image'] = $base_url . $user['image'];
    }
}

// Close the statement and connection
$stmt->close();
$conn->close();

// Return JSON response
header('Content-Type: application/json');
echo json_encode($topUsers);
?>
