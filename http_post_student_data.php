<?php
include("db_connection.php");

// Get the raw POST data
$requestData = file_get_contents('php://input');
$data = json_decode($requestData, true); //return assosiative array

if ($data) {
    $name = $data['name'];   // 'name' from js file parameters
    $email = $data['email'];
    $password = $data['password'];

    if (!empty($name) && !empty($email) && !empty($password)) {
        // Prepared statement to prevent SQL injection
        $stmt = $conn->prepare("INSERT INTO student_data (name, email, password) VALUES (?, ?, ?)");
        $stmt->bind_param("sss", $name, $email, $password);

        if ($stmt->execute()) {
            // echo "Student's data saved into db successfully";
            
        } else {
            echo "Error! Data didn't save in db";
        }

        $stmt->close();
    } else {
        http_response_code(400);        

    }
} else {
    echo "Invalid input";
}

$conn->close();
?>
