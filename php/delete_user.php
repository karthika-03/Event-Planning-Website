<?php
$host = 'localhost';
$dbname = '3knots';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);


    $userId = $_GET['id'];

    $stmt = $pdo->prepare('DELETE FROM users WHERE id = ?');
    $stmt->execute([$userId]);


    echo 'success';
} catch (PDOException $e) {
    echo 'Error: ' . $e->getMessage();
}
?>
