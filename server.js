/*********************************************************************************
* WEB700 – Assignment 04
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part
* of this assignment has been copied manually or electronically from any other source
* (including 3rd party web sites) or distributed to other students.
*
* Name: Chinyere Vanessa Arinze Nkem___ Student ID: 133404236___ Date: 17/07/2024___
*
* Online (Heroku) Link: ________________________________________________________
*
********************************************************************************/



var HTTP_PORT = process.env.port || 8080;
var express = require('express');
var dataCollection = require('./modules/collegeData');
var path = require('path');

var app = express();

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));

// GET Students
app.get("/students", (req,res)=> {

    
    var course_id = req.query.course;

    if (course_id == undefined) {
        dataCollection.getAllStudents()
        .then(
            (student_results) => res.send(student_results) 
        )
        .catch(
            () => res.json({ 'message': "no results" })
        );
    }
    else {
        dataCollection.getStudentsByCourse(course_id)
        .then(
            (student_results) => res.send(student_results) 
        )
        .catch(
            () => res.json({'message': "no results" })
        );
    }


});

// GET /tas
app.get("/tas", (req,res)=> {

    dataCollection.initialize()
    .then(
        () => dataCollection.getTAs() 
    )
    .then(
        (tas_data) => res.send(tas_data) 
    )
    .catch(
        () => res.json({ 'message': "no results"})
    );
});

// GET /courses
app.get("/courses", (req,res)=> {

    dataCollection.initialize()
    .then(
        () => dataCollection.getCourses() 
    )
    .then(
        (course_data) => res.send(course_data) 
    )
    .catch(
        () => res.json({ 'message': "no results" })
    );
});

// GET /student/num
app.get("/student/:num", (req,res)=> {

    var student_num = req.params.num;

    dataCollection.initialize()
    .then(
        () => dataCollection.getStudentByNum(student_num) 
    )
    .then(
        (student_data) => res.send(student_data) 
    )
    .catch(
        () => res.json({'message': "no results" })
    );
});


// GET /
app.get("/", (req,res)=> {
    res.sendFile(path.join(__dirname,"/views/home.html"));
});

// GET /about
app.get("/about", (req,res)=> {
    res.sendFile(path.join(__dirname,"/views/about.html"));
});


// GET /htmlDemo
app.get("/htmlDemo", (req,res)=> {
    res.sendFile(path.join(__dirname,"/views/htmlDemo.html"));
});

app.get("/htmldemo", (req,res)=> {
    res.sendFile(path.join(__dirname,"/views/htmlDemo.html"));
});

app.get("/students/add", (req,res)=> {
    res.sendFile(path.join(__dirname,"/views/addStudent.html"));
});

// Form posting routes
app.post("/students/add", (req, res) => {
    dataCollection.addStudent(req.body) 
    .then(
        () => res.redirect('/students')
    )
    .catch(
        () => res.send({
            'message': "Form Posting Error"
        })
    );
});

app.use(function(req, res){
    res.status(404).sendFile(path.join(__dirname,"/views/404.html"));
});

// setup http server to listen on HTTP_PORT
dataCollection.initialize()
.then(
    () => app.listen(HTTP_PORT, () => {console.log("server listening on port: " + HTTP_PORT)})
)
.catch(
    (err) => console.log(err) 
);