<?php
include("db_connection.php");

// Get the raw POST data
$requestData = file_get_contents('php://input');
$data = json_decode($requestData, true); //return assosiative array

if ($data) {
    $id = $data['id'];
    $name = $data['name'];   // 'name' from js file parameters
    $email = $data['email'];
    $password = $data['password'];
    if (empty($id)){
        http_response_code(400);
        return;
    }
    if (empty($name)){
        http_response_code(400);
        return;
    }
    if (empty($email)){
        http_response_code(400);
        return;
    }
    if (empty($password)){
        http_response_code(400);
        return;
    }
    if (!empty($id) && !empty($name) && !empty($email) && !empty($password)) {
        // Prepared statement to prevent SQL injection
        $stmt = $conn->prepare("UPDATE student_data SET name = ?, email = ?, password = ? WHERE id = ?");
        $stmt->bind_param("sssi",$name, $email, $password, $id);

        if ($stmt->execute()) {
            echo "Student data updated successfully!";
            
        } else {
            echo "Error! Data didn't update in db";
        }

        $stmt->close();
    } else {    
        echo "Fill all fields in update by id";
    }
} else {
    echo "Invalid input";
}

$conn->close();
?>
