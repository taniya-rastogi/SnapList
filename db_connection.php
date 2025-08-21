<?php
    $conn = mysqli_connect("localhost", "root", "", "student_data_ajax");
    if(!$conn){
        die("Not connected to database: ". mysqli_connect_error());
    }
?>