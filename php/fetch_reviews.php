<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "3knots";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT * FROM reviews ORDER BY created_at DESC";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        echo "<div class='review-item'>";
        echo "<h3>" . $row['name'] . "</h3>";
        echo "<p><strong>Rating:</strong> " . $row['rating'] . " ⭐</p>";
        echo "<p>" . $row['review_text'] . "</p>";
        echo "<p><small>Reviewed on: " . $row['created_at'] . "</small></p>";
        echo "</div>";
    }
} else {
    echo "<p>No reviews found</p>";
}

$conn->close();
?>
