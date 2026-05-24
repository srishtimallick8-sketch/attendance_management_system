// =====================
// LOAD STUDENTS
// =====================

let students =
JSON.parse(localStorage.getItem("students")) || [];


// =====================
// ADD STUDENT
// =====================

let studentForm =
document.getElementById("studentForm");

if(studentForm){

    studentForm.addEventListener("submit", function(event){

        event.preventDefault();

        let name =
        document.getElementById("studentName").value;

        let course =
        document.getElementById("course").value;

        let semester =
        document.getElementById("semester").value;

        let student = {

            name: name,
            course: course,
            semester: semester

        };

        students.push(student);

        localStorage.setItem(
            "students",
            JSON.stringify(students)
        );

        alert("Student Added Successfully");

        studentForm.reset();

    });

}


// =====================
// DISPLAY STUDENTS
// =====================

let studentList =
document.getElementById("studentList");

if(studentList){

    displayStudents();

}


function displayStudents(){

    studentList.innerHTML = "";

    students.forEach((student, index) => {

        let div =
        document.createElement("div");

        div.classList.add("student-item");

        div.innerHTML = `

            <span>

                <b>${student.name}</b><br>

                ${student.course}
                - Semester ${student.semester}

            </span>

            <div>

                <button class="edit-btn"
                onclick="editStudent(${index})">

                    Update

                </button>

                <button class="delete-btn"
                onclick="deleteStudent(${index})">

                    Delete

                </button>

            </div>

        `;

        studentList.appendChild(div);

    });

}


// =====================
// DELETE STUDENT
// =====================

function deleteStudent(index){

    let deletedStudentName =
    students[index].name;

    // Remove student

    students.splice(index, 1);

    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );


    // Remove attendance records

    let attendanceData =

    JSON.parse(
        localStorage.getItem("attendance")
    ) || [];

    attendanceData = attendanceData.filter(

        record =>

        record.name !== deletedStudentName

    );

    localStorage.setItem(

        "attendance",

        JSON.stringify(attendanceData)

    );


    // Refresh list

    displayStudents();

}

// =====================
// GO TO UPDATE PAGE
// =====================

function editStudent(index){

    localStorage.setItem(
        "editIndex",
        index
    );

    window.location.href =
    "update.html";

}


// =====================
// UPDATE PAGE
// =====================

let updateForm =
document.getElementById("updateForm");

if(updateForm){

    let editIndex =
    localStorage.getItem("editIndex");

    document.getElementById("updateName").value =
    students[editIndex].name;

    document.getElementById("updateCourse").value =
    students[editIndex].course;

    document.getElementById("updateSemester").value =
    students[editIndex].semester;


    updateForm.addEventListener(
    "submit",
    function(event){

        event.preventDefault();

        students[editIndex].name =
        document.getElementById("updateName").value;

        students[editIndex].course =
        document.getElementById("updateCourse").value;

        students[editIndex].semester =
        document.getElementById("updateSemester").value;

        localStorage.setItem(
            "students",
            JSON.stringify(students)
        );

        alert("Student Updated");

        window.location.href =
        "manage.html";

    });

}


// =====================
// ATTENDANCE PAGE
// =====================

let attendanceBody =
document.getElementById("attendanceBody");

if(attendanceBody){

    students.forEach((student, index) => {

        let row =
        document.createElement("tr");

        row.innerHTML = `

            <td>${student.name}</td>

            <td>

                <select id="status-${index}">

                    <option>Present</option>

                    <option>Absent</option>

                </select>

            </td>

        `;

        attendanceBody.appendChild(row);

    });

}

function saveAttendance(){

    let classDate =
    document.getElementById(
        "classDate"
    ).value;

    if(classDate === ""){

        alert("Please Select Class Date");

        return;

    }

    let attendanceData =

    JSON.parse(
        localStorage.getItem("attendance")
    ) || [];


    students.forEach((student, index) => {

        let status =
        document.getElementById(
            `status-${index}`
        ).value;

        attendanceData.push({

            date: classDate,

            name: student.name,

            status: status

        });

    });


    localStorage.setItem(

        "attendance",

        JSON.stringify(attendanceData)

    );

    alert("Attendance Saved");

}
// =====================
// REPORT PAGE
// =====================

let reportBody =
document.getElementById("reportBody");

if(reportBody){

    reportBody.innerHTML = "";

    let attendanceData =

    JSON.parse(
        localStorage.getItem("attendance")
    ) || [];


    students.forEach((student, index) => {

        let totalClasses = 0;

        let presentCount = 0;


        attendanceData.forEach((record) => {

            if(record.name === student.name){

                totalClasses++;

                if(record.status === "Present"){

                    presentCount++;

                }

            }

        });


        let percentage = 0;

        if(totalClasses > 0){

            percentage =
            (presentCount / totalClasses) * 100;

        }


        let row =
        document.createElement("tr");

        row.innerHTML = `

            <td>${student.name}</td>

            <td>${totalClasses}</td>

            <td>${percentage.toFixed(2)}%</td>

            <td>

                <button
                onclick="openCalendar(${index})">

                    View

                </button>

            </td>

        `;

        reportBody.appendChild(row);

    });

}
// =====================
// OPEN STUDENT CALENDAR
// =====================

function openCalendar(index){

    localStorage.setItem(
        "calendarStudent",
        index
    );

    window.location.href =
    "studentcalendar.html";

}


// =====================
// STUDENT CALENDAR PAGE
// =====================

let calendarBody =
document.getElementById("calendarBody");

if(calendarBody){

    let studentIndex =
    localStorage.getItem(
        "calendarStudent"
    );

    let student =
    students[studentIndex];

    document.getElementById(
        "studentTitle"
    ).innerHTML =

    student.name + "'s Attendance";


    let attendanceData =

    JSON.parse(
        localStorage.getItem("attendance")
    ) || [];


    attendanceData.forEach((record) => {

        if(record.name === student.name){

            let row =
            document.createElement("tr");

            row.innerHTML = `

                <td>${record.date}</td>

                <td>

                    ${record.status}

                </td>

            `;

            calendarBody.appendChild(row);

        }

    });

}