<?php
// Database connection
$host = 'localhost';
$user = 'root';
$pass = '';
$db = '3knots';

$conn = new mysqli($host, $user, $pass, $db);


if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
$id = $_POST['id'];


$sql = "SELECT id, name, email, phone, address, event_date, guest_count, event_place, venue, invitation_card, entertainment, food, photos_videos, decoration, payment_status, event_status FROM event_details WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param('i', $id);
$stmt->execute();
$result = $stmt->get_result();

$details = $result->fetch_assoc();


header('Content-Type: application/json');
echo json_encode($details);

$stmt->close();
$conn->close();
?>
