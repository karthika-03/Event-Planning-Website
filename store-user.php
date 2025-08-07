<?php
// Enable error reporting for debugging
error_reporting(E_ALL); 
ini_set('display_errors', 1);

// Database connection details (replace with your actual database details)
$host = 'localhost';  // Make sure you define the host variable correctly
$dbname = '3knots';  // Replace with your actual database name
$username = 'root';  // Replace with your database username
$password = '';  // Replace with your actual password

// Create connection
$conn = new mysqli($host, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get the data sent via POST
$uid = $_POST['uid'];
$email = $_POST['email'];
$displayName = $_POST['displayName'];  // Make sure this matches the form field name

// Debugging: Check if the data is received
if (!$uid || !$email || !$displayName) {
    die("Missing data: uid=$uid, email=$email, displayName=$displayName");
}

// Check if the user already exists
$sql = "SELECT * FROM users WHERE uid = '$uid'";
$result = $conn->query($sql);

if ($result->num_rows == 0) {
    // Insert a new user with the default role 'user'
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
