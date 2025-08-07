<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "3knots";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode([]));
}

$sql = "SELECT event_date FROM event_details";
$result = $conn->query($sql);

$booked_dates = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $booked_dates[] = $row['event_date'];
    }
}

header('Content-Type: application/json');
echo json_encode($booked_dates);

$conn->close();
?>
