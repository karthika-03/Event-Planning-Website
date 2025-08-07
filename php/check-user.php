<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "3knots";

$conn = new mysqli($host, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$uid = $_POST['uid'];
$email = $_POST['email'];
$displayName = $_POST['displayName'];

$sql = "SELECT * FROM users WHERE uid = '$uid'";
$result = $conn->query($sql);

if ($result->num_rows == 0) {
    $stmt = $conn->prepare("INSERT INTO users (uid, email, displayName, role) VALUES (?, ?, ?, 'user')");
    $stmt->bind_param("sss", $uid, $email, $displayName);

    if ($stmt->execute()) {
        echo json_encode(["status" => "success", "message" => "User added successfully"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Error adding user"]);
    }

    $stmt->close();
} else {
    echo json_encode(["status" => "success", "message" => "User already exists"]);
}

$conn->close();
?>
