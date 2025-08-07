<?php
header('Content-Type: application/json'); 

$host = 'localhost';
$dbname = '3knots';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $data = json_decode(file_get_contents('php://input'), true);

    if (isset($data['review_id'])) {
        $reviewId = $data['review_id'];

        $stmt = $pdo->prepare('DELETE FROM reviews WHERE id = :id');
        $stmt->bindParam(':id', $reviewId, PDO::PARAM_INT);

        if ($stmt->execute()) {

            echo json_encode(['success' => true, 'message' => 'Review deleted successfully']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Error deleting review']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'No review ID provided']);
    }
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
}
?>
