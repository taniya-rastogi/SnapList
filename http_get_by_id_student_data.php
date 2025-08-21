<?php
include("db_connection.php");

$id = $_GET['id'];

$sql = "SELECT * FROM student_data WHERE id='$id'";
$result = $conn->query($sql);
if($result->num_rows > 0){
    $studentData = array();
    while($row = $result->fetch_assoc()){
        $studentData[] = $row;
    }
}
echo json_encode($studentData);
?>