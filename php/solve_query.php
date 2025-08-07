<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "3knots";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Retrieve the incoming data
$data = json_decode(file_get_contents('php://input'), true);
if(isset($data['contact_id'])) {
    $contact_id = $data['contact_id'];

    // Update the contact's status to 'solved'
    $query = "UPDATE contacts SET status = 'solved' WHERE id = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("i", $contact_id);

    if ($stmt->execute()) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false, "error" => "Failed to update status."]);
    }

    $stmt->close();
} else {
    echo json_encode(["success" => false, "error" => "Contact ID not provided."]);
}
$conn->close();
?>
