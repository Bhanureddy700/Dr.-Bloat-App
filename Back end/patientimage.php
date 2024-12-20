<?php
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if(isset($_POST['userid'], $_FILES['image'])) {
        $userId = $_POST['userid'];
        $uploadDir = "images/";

        if (!file_exists($uploadDir)) {
            mkdir($uploadDir, 0777, true);
        }

        $tempFilename = $_FILES['image']['tmp_name'];
        $originalFilename = $_FILES['image']['name'];
        $newFilename = uniqid() . '_' . $originalFilename;
        $targetPath = $uploadDir . $newFilename;

        if(move_uploaded_file($tempFilename, $targetPath)) {
            $sql = "UPDATE patient SET image = '$targetPath' WHERE userid = '$userId'";

            if ($conn->query($sql) === TRUE) {
                echo json_encode(array("success" => true, "message" => "Image uploaded successfully", "imageUrl" => $targetPath));
            } else {
                echo json_encode(array("success" => false, "message" => "Error updating image for userid: " . $conn->error));
            }
        } else {
            echo json_encode(array("success" => false, "message" => "Error: Failed to move uploaded file."));
        }
    } else {
        echo json_encode(array("success" => false, "message" => "Missing POST variables for image insertion."));
    }
}

$conn->close();
?>
