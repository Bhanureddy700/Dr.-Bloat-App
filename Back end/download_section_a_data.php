<?php
// Include the database connection file
require_once 'config.php';

// Query to fetch data from the Section A table
$sql = "SELECT id, userid, Q1, Q2, Q3, Q4, Q5, Q6, Q7, A1, A2, A3, A4, A5, A6, A7, DT FROM sectiona";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Set headers for file download
    header('Content-Type: text/csv; charset=utf-8');
    header('Content-Disposition: attachment; filename=section_a_data.csv');
    header('Pragma: no-cache');
    header('Expires: 0');

    // Open the output stream
    $output = fopen('php://output', 'w');

    // Write the column headers
    fputcsv($output, ['id', 'userid', 'Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7', 'A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'DT']);

    // Write the data rows
    while ($row = $result->fetch_assoc()) {
        fputcsv($output, $row);
    }

    // Close the output stream
    fclose($output);
} else {
    echo "No data found.";
}

// Close the database connection
$conn->close();
?>
