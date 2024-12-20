<?php
// Database connection parameters
require_once 'config.php';
// Retrieve registration data from POST request
$userid = $_POST['userid'];
$name = $_POST['name'];
$password = $_POST['password'];
$mobile = $_POST['mobile'];
$gender = $_POST['gender'];

// Check if userid exists in the admin table
$check_sql = "SELECT * FROM admin WHERE DTID = '$userid'";
$check_result = $conn->query($check_sql);

if ($check_result->num_rows == 0) {
    // userid not found in admin table
    echo json_encode(array("status" => "error", "message" => "User ID does not exist in the admin table. Please Contact Admin"));
    $conn->close();
    exit();
}

// Handle image upload
$imagePath = ''; // Initialize image path variable

if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
    // Specify the directory where images will be saved
    $target_dir = "images/";

    // Get the file extension
    $imageFileType = pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION);

    // Generate a unique file name
    $uniqueFileName = uniqid() . '.' . $imageFileType;

    // Specify the path of the image file
    $target_file = $target_dir . $uniqueFileName;

    // Attempt to move the uploaded file to the specified directory
    if (move_uploaded_file($_FILES['image']['tmp_name'], $target_file)) {
        $imagePath = $target_file;
    } else {
        die(json_encode(array("status" => "error", "message" => "Sorry, there was an error uploading your file.")));
    }
}

// SQL query to insert registration data into the doctor table
$sql1 = "INSERT INTO doctor (userid, name, password, mobile, gender, image)
         VALUES ('$userid', '$name', '$password', '$mobile', '$gender', '$imagePath')";

// Execute the SQL queries
if ($conn->query($sql1) === TRUE) {
    echo json_encode(array("status" => "success"));
} else {
    echo json_encode(array("status" => "error", "message" => "Error: " . $conn->error));
}

// Close connection
$conn->close();
?>
