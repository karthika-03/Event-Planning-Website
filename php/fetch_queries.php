<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "3knots";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$query = "SELECT * FROM contacts";
$result = $conn->query($query);

if ($result === false) {
    echo json_encode(["error" => $conn->error]);
    exit;
}

$contacts = array();

while ($row = $result->fetch_assoc()) {
    $contacts[] = $row;
}

header('Content-Type: application/json');

echo json_encode($contacts);
?>
