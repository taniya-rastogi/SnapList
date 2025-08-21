let form_saveBtn_parent = document.querySelector(".form_saveBtn_parent");
let msg = document.querySelector(".msg");
let add_student_form = document.querySelector("#add_student_form");
let getBtn = document.querySelector(".getBtn");
let tbody = document.querySelector("tbody");
let nameField = document.querySelector(".nameField");
let emailField = document.querySelector(".emailField");
let passwordField = document.querySelector(".passwordField");
let email_invalid_msg = document.querySelector(".email_invalid_msg");
let empty_input_msg = document.querySelector(".empty_input_msg");
let pagination = document.querySelector(".pagination");
let search_input = document.querySelector(".search_input");
let searchBtn = document.querySelector(".searchBtn");
let show_table_tbody = document.querySelector(".show_table_tbody");
let search_table_tbody = document.querySelector(".search_table_tbody");
let empty_search_input_msg = document.querySelector(".empty_search_input_msg");


//Add show pages buttons 
function show_pages() {
    let totalStd = 50;
    let limit = 5;
    for (i = 1; i <= totalStd / limit; i++) {
        // dynamically creating pagination buttons 
        pagination.innerHTML += "<ul class='pagination'><li class='page_item'><a class='page-link' href='#' data-id=" + i + "> " + i + " </a></li></ul>"
    }

}
show_pages(); //to show pagination buttons
show_student_data(1); // here 1 is page number

//by clicking on the page number, show students data
pagination.addEventListener("click", function (e) {
    if (e.target.classList.contains("page-link")) {
        let pageNum = e.target.getAttribute("data-id");
        show_student_data(pageNum); //show student data according to the page number
    }
})

//show student data in normal table
function show_student_data(pageNum) {
    show_table_tbody.innerHTML = ""; //whenever show_student_data function will be called...firstly the whole data of normal table will be removed then the new data (after delete or save or update) will be displayed
   
    const xhr = new XMLHttpRequest(); //XMLHttpRequest is a class, xhr is a object
    xhr.open("GET", `http_get_student_data.php?id=${pageNum}`, true);

    xhr.onload = () => {
        if (xhr.status === 200) {
            let response = JSON.parse(xhr.responseText); // converting json String to Js object
            let limit = 5;
            let j = (pageNum - 1) * limit + 1;
            for (let i = 0; i < response.length; i++) {

                show_table_tbody.innerHTML += "<tr><td>" + j++ +
                    "</td><td>" + response[i].name +
                    "</td><td>" + response[i].email +
                    "</td><td>" + response[i].password +
                    "</td><td><button type='button' class='btn btn-primary list_updateBtn me-3' data-id='" + response[i].id +
                    "'>Update</button><button type='button' class='btn btn-danger deleteBtn' data-id='" + response[i].id +
                    "'>Delete</button></td></tr>"
            }
        } else {
            msg.innerHTML = "<div class='alert alert-danger mt-4' role='alert'>Problem accourd! Unable to show data.</div>"

        }
    }
    xhr.send();
}



//create operation or save student
function save_Student(e) {
    // e.preventDefault(); //it stops reloading

    let nameField = document.querySelector(".nameField").value.trim();
    let emailField = document.querySelector(".emailField").value.trim();
    let passwordField = document.querySelector(".passwordField").value.trim();

    if (nameField === "") {

    }
    if (emailField === "") {

    }
    if (passwordField === "") {
    }
    else {
        if (validateEmail(emailField)) {
            const xhr = new XMLHttpRequest();
            xhr.open("POST", "http_post_student_data.php", true);
            xhr.setRequestHeader("content-type", "application/json")
            xhr.onload = function () {
                if (xhr.status === 200) {
                    add_student_form.reset();
                    msg.innerHTML = "<div class='alert alert-success mt-4' role='alert'>Student's data saved successfully!</div>"
                    show_student_data(1);
                } else {
                    msg.innerHTML = "<div class='alert alert-danger mt-4' role='alert'>Fill all the fields!</div>"
                }
            }
            let myData = {            //initialising js object
                name: nameField,
                email: emailField,
                password: passwordField
            };
            xhr.send(JSON.stringify(myData)); 
            email_invalid_msg.innerText = "";
            show_student_data(1);
        } else {
            email_invalid_msg.innerText = "*Email is not valid!";
        }
    }
}

//Delete operation
function delete_student(studentId) {
    const xhr = new XMLHttpRequest();
    xhr.open("DELETE", "http_delete_student_data.php", true);
    xhr.setRequestHeader("content-type", "application/json")
    xhr.onload = function () {
        if (xhr.status === 200) {
            msg.innerHTML = "<div class='alert alert-danger mt-4' role='alert'>Student's data deleted successfully!</div>"
            // show_student_data(1);    
            search(search_input.value);
        } else {
            msg.innerHTML = "<div class='alert alert-danger mt-4' role='alert'>Problem occured! in deletion</div>"
        }
    }
    let myData = {  //js obj
        id: studentId
    };
    xhr.send(JSON.stringify(myData));
}

//get data by id to show into input fields operation
function getStudentById(studentId) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `http_get_by_id_student_data.php?id=${studentId}`, true);
    xhr.onload = function () {
        if (xhr.status === 200) {
            let data_for_updation = JSON.parse(xhr.responseText); //convert into js obj

            nameField.value = data_for_updation[0].name;
            emailField.value = data_for_updation[0].email;
            passwordField.value = data_for_updation[0].password;
            form_saveBtn_parent.innerHTML = "<button class='btn btn-primary form_update_button' type='button' data-id='" + data_for_updation[0].id + "'>Update</button>" //converting save btn to update btn
        } else {
            msg.innerHTML = "<div class='alert alert-danger mt-4' role='alert'>Problem occured in updation!</div>"
        }
    }
    xhr.send();
}


//update data by id operation
function update_student(studentId) {
    let nameField = document.querySelector(".nameField").value.trim();
    let emailField = document.querySelector(".emailField").value.trim();
    let passwordField = document.querySelector(".passwordField").value.trim();


    if (validateEmail(emailField)) {
        const xhr = new XMLHttpRequest();
        xhr.open("PUT", "http_update_by_id_student_data.php", true);
        xhr.setRequestHeader("content-type", "application/json")
        xhr.onload = function () {
            if (xhr.status === 200) {
                add_student_form.reset();
                msg.innerHTML = "<div class='alert alert-success mt-4' role='alert'>Student's data updated successfully!</div>"
                show_student_data(1);   //to update info from show table
                search(search_input.value);  //to update info form search table

            } else {
                msg.innerHTML = "<div class='alert alert-danger mt-4' role='alert'>Fill all the fields!</div>"
            }
        }
        let myData = {//initialising js object
            id: studentId,
            name: nameField,
            email: emailField,
            password: passwordField
        };
        xhr.send(JSON.stringify(myData));
        email_invalid_msg.innerText = "";
        form_saveBtn_parent.innerHTML = "<button class='btn btn-success' type='button'>Save</button>"


    } else {
        email_invalid_msg.innerText = "*Email is not valid!";
    }
}

function show_single_student_in_search_list(studentId){
    show_table_tbody.innerHTML += "<tr><td>" + 1 +
    "</td><td>" + response[studentId].name +
    "</td><td>" + response[studentId].email +
    "</td><td>" + response[studentId].password +
    "</td><td><button type='button' class='btn btn-primary list_updateBtn me-3' data-id='" + response[studentId].id +
    "'>Update</button><button type='button' class='btn btn-danger deleteBtn' data-id='" + response[studentId].id +
    "'>Delete</button></td></tr>"
}



show_table_tbody.addEventListener("click", function (e) {
    if (e.target.classList.contains("deleteBtn")) { //for delete button
        let studentId = e.target.getAttribute("data-id");
        delete_student(studentId);
        show_student_data(1);

    } else if (e.target.classList.contains("list_updateBtn")) { //for list update button
        let studentId = e.target.getAttribute("data-id");
        getStudentById(studentId);
    }
})
search_table_tbody.addEventListener("click", function (e) {
    if (e.target.classList.contains("deleteBtn")) { //for delete button
        let studentId = e.target.getAttribute("data-id");
        delete_student(studentId);
        show_student_data(1);

    } else if (e.target.classList.contains("list_updateBtn")) { //for list update button
        let studentId = e.target.getAttribute("data-id");
        getStudentById(studentId);
    }
})

form_saveBtn_parent.addEventListener("click", function (e) {
    if (e.target.classList.contains("form_update_button")) {
        let studentId = e.target.getAttribute("data-id");
        if (studentId) {
            update_student(studentId);

        } else {
            msg.innerHTML = "<div class='alert alert-danger mt-4' role='alert'>Error! in updation</div>"
        }
    } else {
        save_Student(e);
    }
})
function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}
//Search data

function search() {
    if(typeof search_input === 'undefined' || search_input.value.trim() === ""){ //used typeof to check if search_input exists/defined or undefined
     
        empty_search_input_msg.innerText = "\n *Search field is empty!";  

    }else{
        search_table_tbody.innerHTML = "";
        let nameFormate = search_input.value;
        const xhr = new XMLHttpRequest();
        xhr.open("GET", "http_search_student.php?name=" + nameFormate, true);
        xhr.onload = function () {
            if (xhr.status === 200) {
                let res = JSON.parse(xhr.responseText); // converting json String to Js object
                console.log(res);

                console.log("clicked2");
                // let limit = 5;
                // let j = (pageNum - 1) * limit + 1;
                for (let i = 0; i < res.length; i++) {

                    search_table_tbody.innerHTML += "<tr><td>" + res[i].id +
                        "</td><td>" + res[i].name +
                        "</td><td>" + res[i].email +
                        "</td><td>" + res[i].password +
                        "</td><td><button type='button' class='btn btn-primary list_updateBtn me-3' data-id='" + res[i].id +
                        "'>Update</button><button type='button' class='btn btn-danger deleteBtn' data-id='" + res[i].id +
                        "'>Delete</button></td></tr>"
                }
            } else {
                msg.innerHTML = "<div class='alert alert-danger mt-4' role='alert'>Problem occured in searching!</div>"
            }
        }
        xhr.send();
    }
}
searchBtn.addEventListener("click", search);

//things to fix
// 4. alerting success/fail (Done)
// 5. list id should be like 1 2 3 (Done)
// 6. pagination (Done)
// 1. remove faltu k comments (Done)
// 2. proper fomrmatting
// 3. form validation (Email Done)



// priority
// btn issue (Done)
// search result should not append (Done)


// updated from 'search table'- *details filled in fields autometically (Dnoe)
//                              *updated in search table (Dnoe)
//                              *updated in normal table (Dnoe)

// delete from 'search table'-  *delete in normal table (Pending)************ jese hi search table se delete kre to normal table load honi chahiy
//                              *delete in search table (Done)

// updated from 'normal table'- *details filled in fields autometically (Done)
//                              *updated in search table (Done)
//                              *updated in normal table (Done)

// delete from 'normal table'-  *delete in normal table (Done)
//                              *delete in search table (Done)


// PHP's json_encode() and Javascript's JSON.stringify()
// PHP's json_decode()