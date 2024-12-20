<?php
// Include the database connection file
require_once 'config.php';

// Query to fetch data from the patient table
$sql = "SELECT userid, password, name, mobile, age, gender, address, image, doctorId FROM patient";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Set headers for file download
    header('Content-Type: text/csv; charset=utf-8');
    header('Content-Disposition: attachment; filename=patient_data.csv');
    header('Pragma: no-cache');
    header('Expires: 0');

    // Open the output stream
    $output = fopen('php://output', 'w');

    // Write the column headers
    fputcsv($output, ['userid', 'password', 'name', 'mobile', 'age', 'gender', 'address', 'image', 'doctorId']);

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
