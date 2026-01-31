<?php
//http_total_students.php

include("db_connection.php");

$result = $conn->query("SELECT COUNT(*) as total FROM student_data");
$row = $result->fetch_assoc();

echo json_encode(['total' => $row['total']]);
?>
