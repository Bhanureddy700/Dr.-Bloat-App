<?php

// Database credentials
require_once 'config.php';

// Check if required parameters are present in the POST request
if (isset($_POST['userid'], $_POST['message'], $_POST['dateTime'])) {
  // Get data from POST request
  $userid = $_POST['userid'];
  $message = $_POST['message'];
  $dateTime = $_POST['dateTime'];

  // Prepare SQL statement
  $sql = "INSERT INTO message (userid, message, dateTime) VALUES ('$userid', '$message', '$dateTime')";

  // Execute SQL statement
  if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
  } else {
    echo "Error: " . $sql . "<br>" . $conn->error;
  }
} else {
  echo "Error: Required parameters are missing";
}

// Close connection
$conn->close();

?>
