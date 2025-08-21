<?php
include("db_connection.php");
$limit = 5;
// $page = 1;
$id = $_GET['id'];
$page = $id;
$offset = ($page - 1) * $limit;
// Fetch paginated data using LIMIT and OFFSET
$sql = "SELECT * FROM student_data ORDER BY id DESC LIMIT $limit OFFSET $offset";
// $sql = "SELECT * FROM student_data WHERE name LIKE '%some%' OR email LIKE '%jikojioj%' ";
$result = $conn->query($sql);
if($result->num_rows > 0){
    $studentData = array();
    while($row = $result->fetch_assoc()){
        $studentData[] = $row;
    }
}

// $response = array(
//     'total' => $totalStd,     
//     'students' => $studentData
// );
echo json_encode($studentData);
?>