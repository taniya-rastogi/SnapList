<?php
//http_delete_student_data.php

include("db_connection.php");

$rawData = file_get_contents('php://input');
$data = json_decode($rawData, true); //return assosiative array
$id = $data['id'];

if (!empty($id)) {

    $sql = "DELETE FROM student_data WHERE id = {$id}";
    if ($conn->query($sql)) {
        echo "Student's data deleted from db successfully";
    } else {
        echo "Error! Data didn't delete from db";
    }
} else {
    echo "Error";
}
