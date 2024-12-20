<?php

// Assuming you have already established a connection to your MySQL database
require_once 'config.php';

// Handling POST request from React Native app
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $data = json_decode(file_get_contents("php://input"), true);

    // Get the data sent from React Native app
    $userid = $data['userid'];
    $question1 = $data['question1'] ?? 0;
    $question2 = $data['question2'] ?? 0;
    $question3 = $data['question3'] ?? 0;
    $question4 = $data['question4'] ?? 0;
    $question5 = $data['question5'] ?? 0;
    $question6 = $data['question6'] ?? 0;
    $question7 = $data['question7'] ?? 0;
    $option1 = $data['question1_selectedOption'] ?? '';
    $option2 = $data['question2_selectedOption'] ?? '';
    $option3 = $data['question3_selectedOption'] ?? '';
    $option4 = $data['question4_selectedOption'] ?? '';
    $option5 = $data['question5_selectedOption'] ?? '';
    $option6 = $data['question6_selectedOption'] ?? '';
    $option7 = $data['question7_selectedOption'] ?? '';
    $dateTime = $data['dateTime'] ?? '';

    // Prepare SQL statement to insert data into your table
    $sql = "INSERT INTO sectiona (userid, Q1, Q2, Q3, Q4, Q5, Q6, Q7, A1, A2, A3, A4, A5, A6, A7, DT) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);

    // Bind parameters
    $stmt->bind_param("iiiiiiisssssssss", $userid, $question1, $question2, $question3, $question4, $question5, $question6, $question7, $option1, $option2, $option3, $option4, $option5, $option6, $option7, $dateTime);

    // Execute the statement
    if ($stmt->execute()) {
        echo "Data inserted successfully.";
    } else {
        echo "Error: " . $sql . "<br>" . $stmt->error;
    }

    // Close statement and connection
    $stmt->close();
    $conn->close();
}
?>