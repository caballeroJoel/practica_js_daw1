import { mostrarTareas } from "./funciones.js";

const btnTask = document.querySelector("#btnTask");
const btnDeptUser = document.querySelector("#btnDeptUser");

const formNewTask = document.querySelector("#formNewTask");
const popUserDept = document.querySelector("#popUserDept");

const formBox = document.querySelector(".formBox");
const deptUser = document.querySelector(".containerDeptUser");

const btnNewTask = document.querySelector("#btnNewTask");
const btnNewDept = document.querySelector("#btnNewDept");

btnNewTask.addEventListener("click", function (e) {
    e.preventDefault();
    const tarea = document.querySelector("#tarea").value;
    const prori = document.querySelector("#prori").value;
    const colabo = document.querySelector("#colabo").value;
    const depart = document.querySelector("#depart").value;

    formNewTask.classList.add("hidde");

    let pr;

    if(prori=="alta") pr="!!!";
    if(prori=="media") pr="!!";
    if(prori=="baja") pr="!";

    
    const dato = localStorage.getItem("tareas");
    const tareaLista = JSON.parse(dato) ?? [];
    
    tareaLista.push({
        tarea: tarea,
        pr: prori,
        depart: depart,
        estado: "1"
    });

    localStorage.setItem("tareas", JSON.stringify(tareaLista));

    mostrarTareas();

});

btnNewDept.addEventListener("click", function () {
    const newDept = document.querySelector("#newDept").value;
    let newDepart = [];

    const colores = [
    "FF6A6A",
    "6AFFA1",
    "6A99FF",
    "F4D03F",
    "c875e9",
    "bc7b1a",
    "E74C3C"
    ];

    const colorAleatorio = colores[Math.floor(Math.random() * colores.length)];

    console.log(colorAleatorio);

    newDepart.push({dept: newDept, col: colorAleatorio});

    console.log(newDepart);
});


/*************** FUNCION CLASES FORM NEW TASK ***************/

btnTask.addEventListener("click", function (e) {
    e.stopPropagation();
    formNewTask.classList.toggle("hidde");
});

document.addEventListener("click", function (e) {
    if (
        !formNewTask.classList.contains("hidde") &&
        !formBox.contains(e.target) &&
        e.target !== btnTask
    ) {
        formNewTask.classList.add("hidde");
    }
});

/**************************************************************/


/*************** FUNCION CLASES FORM DEPT/USERS ***************/

btnDeptUser.addEventListener("click", function (e) {
    e.stopPropagation();
    popUserDept.classList.toggle("hidde");
});

document.addEventListener("click", function (e) {
    if (
        !popUserDept.classList.contains("hidde") &&
        !deptUser.contains(e.target) &&
        e.target !== btnNewDept
    ) {
        popUserDept.classList.add("hidde");
    }
});

/**************************************************************/