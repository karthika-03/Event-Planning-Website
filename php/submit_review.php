<?php
    // MySQL connection details
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

    // Get POST data from form submission
    $name = isset($_POST['name']) ? $_POST['name'] : null;
    $email = isset($_POST['email']) ? $_POST['email'] : null;
    $rating = isset($_POST['rating']) ? $_POST['rating'] : null;
    $review = isset($_POST['reviewText']) ? $_POST['reviewText'] : null;

    // Check if any of the required fields are missing
    if (empty($name) || empty($email) || empty($rating) || empty($review)) {
        echo json_encode(["message" => "Error: All fields are required."]);
        exit;
    }

    // SQL query to insert review
    $sql = "INSERT INTO reviews (name, email, rating, review) VALUES ('$name', '$email', '$rating', '$review')";

    if ($conn->query($sql) === TRUE) {
        // Redirect to view_reviews.php after successful submission
        header("Location: view_reviews.php");
        exit();
    } else {
        echo json_encode(["message" => "Error: " . $conn->error]);
    }

    // Close connection
    $conn->close();
?>
