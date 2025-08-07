<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "3knots";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(['status' => 'error', 'message' => 'Connection failed: ' . $conn->connect_error]));
}

$name = $_POST['name'] ?? '';
$email = $_POST['email'] ?? '';
$phone = $_POST['phone'] ?? '';
$address = $_POST['address'] ?? '';
$eventDate = $_POST['event-date'] ?? '';
$guestCount = $_POST['guest-count'] ?? '';
$eventPlace = $_POST['event-place'] ?? '';
$venue = $_POST['venue'] ?? '';
$invitationCard = $_POST['invitation-card'] ?? '';
$entertainment = $_POST['entertainment'] ?? '';
$food = $_POST['food'] ?? '';
$photosVideos = $_POST['photos-videos'] ?? '';
$decoration = $_POST['decoration'] ?? '';

$sql = "INSERT INTO event_details (name, email, phone, address, event_date, guest_count, event_place, venue, invitation_card, entertainment, food, photos_videos, decoration) 
VALUES ('$name', '$email', '$phone', '$address', '$eventDate', '$guestCount', '$eventPlace', '$venue', '$invitationCard', '$entertainment', '$food', '$photosVideos', '$decoration')";

if ($conn->query($sql) === TRUE) {
    echo json_encode(['status' => 'success']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Error: ' . $conn->error]);
}

$conn->close();
?>
