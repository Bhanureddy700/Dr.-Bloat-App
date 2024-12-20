<?php

// Database credentials
require_once 'config.php';

// Get userid from GET request
$userid = isset($_GET['userid']) ? $_GET['userid'] : null;

// Fetch messages for the specified userid
$sql = "SELECT userid, message, dateTime FROM message WHERE userid = '$userid' ORDER BY dateTime DESC";
$result = $conn->query($sql);

// Check if there are any messages
if ($result->num_rows > 0) {
  // Array to store messages
  $messages = array();

  // Fetch and store each message in the array
  while($row = $result->fetch_assoc()) {
    $message = array(
      'userid' => $row['userid'],
      'message' => $row['message'],
      'dateTime' => $row['dateTime']
    );
    array_push($messages, $message);
  }

  // Output messages as JSON
  echo json_encode($messages);
} else {
  echo "No messages found for userid: $userid";
}

// Close connection
$conn->close();

?>
