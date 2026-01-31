<?php
    //http_search_student.php
    include("db_connection.php");
    $nameFormate = $_GET['name'];
    $sql = "SELECT * FROM student_data WHERE name LIKE '%" . $nameFormate . "%' OR email LIKE '%" . $nameFormate . "%' OR password LIKE '%" . $nameFormate . "%'";
    $result = $conn->query($sql);
    if($result->num_rows > 0){
        $stdData = array();
        while($row = $result->fetch_assoc()){
            $stdData[] = $row;
        }
    }
    echo json_encode($stdData);
?>