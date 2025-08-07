<?php
// Database connection details
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "3knots";

// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    header('Content-Type: application/json');
    echo json_encode(['error' => 'Database connection failed: ' . $conn->connect_error]);
    exit();
}

// Fetch the total number of events
$totalQuery = "SELECT COUNT(*) AS totalEvents FROM event_details";
$totalResult = $conn->query($totalQuery);
if (!$totalResult) {
    header('Content-Type: application/json');
    echo json_encode(['error' => 'Error with total events query: ' . $conn->error]);
    exit();
}
$totalRow = $totalResult->fetch_assoc();
$totalEvents = $totalRow['totalEvents'];

// Fetch the number of not-completed events
$notCompletedQuery = "SELECT COUNT(*) AS notCompletedEvents FROM event_details WHERE event_status = 'Not-Completed'";
$notCompletedResult = $conn->query($notCompletedQuery);
if (!$notCompletedResult) {
    header('Content-Type: application/json');
    echo json_encode(['error' => 'Error with not-completed events query: ' . $conn->error]);
    exit();
}
$notCompletedRow = $notCompletedResult->fetch_assoc();
$notCompletedEvents = $notCompletedRow['notCompletedEvents'];

// Fetch the number of completed events
$completedQuery = "SELECT COUNT(*) AS completedEvents FROM event_details WHERE event_status = 'Completed'";
$completedResult = $conn->query($completedQuery);
if (!$completedResult) {
    header('Content-Type: application/json');
    echo json_encode(['error' => 'Error with completed events query: ' . $conn->error]);
    exit();
}
$completedRow = $completedResult->fetch_assoc();
$completedEvents = $completedRow['completedEvents'];

// Send the response in JSON format
header('Content-Type: application/json');
echo json_encode([
    'totalEvents' => $totalEvents,
    'completedEvents' => $completedEvents,
    'notCompletedEvents' => $notCompletedEvents
]);

// Close the database connection
$conn->close();
?>
