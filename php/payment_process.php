<?php
header('Content-Type: application/json');

// Get the form data sent from the front-end
$rawData = file_get_contents("php://input");
$formData = json_decode($rawData, true);

// Check if data is received
if (!isset($formData['name']) || !isset($formData['email'])) {
    echo json_encode(['success' => false, 'message' => 'Invalid form data.']);
    exit;
}

// Connect to the MySQL database
$servername = "localhost";
$username = "root"; // replace with your DB username
$password = ""; // replace with your DB password
$dbname = "eventDB"; // replace with your DB name

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Prepare and bind SQL query
$stmt = $conn->prepare("INSERT INTO events 
    (name, email, phone, address, event_date, guest_count, event_place, venue, invitation_card, entertainment, food, photos_videos, decoration, payment_status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
$stmt->bind_param(
    "ssssssssssssss", 
    $formData['name'], 
    $formData['email'], 
    $formData['phone'], 
    $formData['address'], 
    $formData['eventDate'], 
    $formData['guestCount'], 
    $formData['eventPlace'], 
    $formData['venue'], 
    $formData['invitationCard'], 
    $formData['entertainment'], 
    $formData['food'], 
    $formData['photosVideos'], 
    $formData['decoration'], 
    $formData['paymentStatus']
);

// Execute the query
if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'Form submitted successfully!']);
} else {
    echo json_encode(['success' => false, 'message' => 'Failed to submit form.']);
}

// Close the connection
$stmt->close();
$conn->close();
?>
