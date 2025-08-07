<?php
// Database configuration
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "3knots";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Set the limit and offset for pagination
$limit = 10;
$page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
$offset = ($page - 1) * $limit;

// Fetch the latest 10 reviews, ordered by created_at descending
$sql = "SELECT name, email, rating, review, created_at FROM reviews ORDER BY created_at DESC LIMIT $limit OFFSET $offset";
$result = $conn->query($sql);

// Function to display stars based on rating
function displayStars($rating) {
    $stars = '';
    for ($i = 1; $i <= 5; $i++) {
        if ($i <= $rating) {
            // Full star (yellow filled)
            $stars .= '<i class="fas fa-star"></i>';
        } else {
            // Empty star (outline only)
            $stars .= '<i class="far fa-star"></i>';
        }
    }
    return $stars;
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>All Reviews</title>
    <link rel="stylesheet" href="../css/view_reviews.css"> <!-- Ensure this file exists -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"> <!-- Font Awesome for stars -->
</head>
<body>
    <div class="review-list">
        <h2>User Reviews</h2>
        <?php
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                echo "<div class='review-item'>";
                echo "<h4>" . $row['name'] . " (" . $row['email'] . ")";
                echo "<span class='timestamp'>" . date("F j, Y, g:i a", strtotime($row['created_at'])) . "</span></h4>";
                echo "<p class='rating'>" . displayStars($row['rating']) . "</p>";
                echo "<p>" . $row['review'] . "</p>";
                echo "</div>";
            }
        } else {
            echo "<p>No reviews available</p>";
        }
        ?>
    </div>

    <?php
    // Calculate the total number of pages
    $sql_count = "SELECT COUNT(*) as total FROM reviews";
    $count_result = $conn->query($sql_count);
    $total_reviews = $count_result->fetch_assoc()['total'];
    $total_pages = ceil($total_reviews / $limit);

    // Display "Next" and "Previous" buttons
    echo '<div class="pagination">';
    if ($page > 1) {
        echo '<a href="?page=' . ($page - 1) . '" class="btn">Previous</a>';
    }
    if ($page < $total_pages) {
        echo '<a href="?page=' . ($page + 1) . '" class="btn">Next</a>';
    }
    echo '</div>';
    ?>

    <div class="button-container">
        <a href="../user.html" class="btn">Go to User Page</a>
        <a href="../review.html" class="btn">Submit a Review</a>
    </div>
</body>
</html>

<?php
$conn->close();
?>
