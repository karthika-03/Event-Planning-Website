<?php

$host = 'localhost';
$user = 'root';
$pass = '';
$db = '3knots';

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT id, name, email, phone, event_date, payment_status, event_status FROM event_details";
$result = $conn->query($sql);

$bookings = array();
while ($row = $result->fetch_assoc()) {
    $bookings[] = $row;
}

header('Content-Type: application/json');
echo json_encode($bookings);

$conn->close();
?>
