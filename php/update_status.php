<?php
// Database connection
$host = 'localhost';
$user = 'root';
$pass = '';
$db = '3knots';

$conn = new mysqli($host, $user, $pass, $db);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get the booking ID and new status from the POST request
$id = $_POST['id'];
$newStatus = $_POST['newStatus'];

// Update the event_status in the database for the given ID
$sql = "UPDATE event_details SET event_status = ? WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param('si', $newStatus, $id);

if ($stmt->execute()) {
    echo "Status updated successfully.";
} else {
    echo "Error updating status: " . $conn->error;
}

$stmt->close();
$conn->close();
?>
