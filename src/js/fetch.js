"use strict"

//Hämtar in element och skapar variabler
let coursesEl = document.getElementById("courses");
let addCourseBtn = document.getElementById("addCourseBtn");
let nameInput = document.getElementById("name");
let codeInput = document.getElementById("code");
let progressionInput = document.getElementById("progression");
let linkInput = document.getElementById("link");


//Händelselyssnare
window.addEventListener('load', getCourses);
addCourseBtn.addEventListener('click', addCourse);


//Funktioner som läser in fetch anrop

//Funktion för att hämta kurser från rest-api
function getCourses(){
    //Gör så att denna funktion körs varje gång fönstret laddas 
    coursesEl.innerHTML ='';

    fetch('http://asaberglund.se/rest-crud/crud.php')
    .then(response => response.json())
    .then(data =>{
        data.forEach(course =>{
            console.log(course.name);
            coursesEl.innerHTML += 
            "<div class='course'><p>"+
            "<b>Kurskod: </b>" + course.code + "<br>" +
            "<b>Namn: </b>" + course.name + "<br>" +
            "<b>Progression: </b>" + course.progression + "<br>" +
            "<b>Kursplan: </b><a href='" + course.link + "'>Länk till Kursplan</a><br>" +
            "</p></div> <button class='button2' id='"+ course.id +"' onClick='deleteCourse("+ course.id +")'> Radera </button> <hr>";
        })
    })
}

function deleteCourse(id){
    fetch("http://asaberglund.se/rest-crud/crud.php?id="+ id, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(data =>{
        getCourses();
    })
    .catch(error =>{
        console.log('Error:', error);
    })
}
function addCourse(){
    let name= nameInput.value;
    let code= codeInput.value;
    let progression= progressionInput.value;
    let link= linkInput.value;

    let course = {'name': name, 'code': code, 'progression': progression, 'link': link};

    fetch("http://asaberglund.se/rest-crud/crud.php",{
        method: 'POST',
        body: JSON.stringify(course),
    })
    .then(response => response.json())
    .then(data =>{
        getCourses();
    })
    .catch(error =>{
        console.log('Error:', error);
    })

}
