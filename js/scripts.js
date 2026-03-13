import { mostrarTareas, cargarDeptUs } from "./funciones.js";

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

    if(prori != "-" && colabo != "-" && depart != "-") {

        const form = document.querySelector(".formBox");
        const text = form.querySelector("textarea");
        const selects = form.querySelectorAll("select");

        text.classList.remove("error");
        selects.forEach(select => {
            select.classList.remove("error");
        });

        formNewTask.classList.add("hidde");

        let pr;
        let id;

        if(prori=="alta") pr="!!!";
        if(prori=="media") pr="!!";
        if(prori=="baja") pr="!";

        
        const dato = localStorage.getItem("tareas");
        const tareaLista = JSON.parse(dato) ?? [];

        id = tareaLista.length+1;

        console.log("ID: "+id);
        
        tareaLista.push({
            id: id,
            tarea: tarea,
            pr: prori,
            depart: depart,
            estado: "1"
        });

        localStorage.setItem("tareas", JSON.stringify(tareaLista));

        mostrarTareas();
    } else {
        const form = document.querySelector(".formBox");
        const text = form.querySelector("textarea");
        const selects = form.querySelectorAll("select");

        text.classList.add("error");
        selects.forEach(select => {
            select.classList.add("error");
        });
    }

});

btnNewDept.addEventListener("click", function () {
    const newDept = document.querySelector("#newDept").value;

    const dato = localStorage.getItem("depts");
    const depars = JSON.parse(dato) ?? [];

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

    depars.push({dept: newDept, col: colorAleatorio});

    console.log(depars);

    localStorage.setItem("depts", JSON.stringify(depars));

    cargarDeptUs();

});

window.aumentarEstado = function (id) {
    const dato = localStorage.getItem("tareas");
    const tasks = JSON.parse(dato);

    const task = tasks.find(t => t.id===id);

    console.log(task);
    
    if(task) {
        if(task.estado == "1") {
            task.estado = "2";
        } else if(task.estado == "2") {
            task.estado = "3";
        }
        localStorage.setItem("tareas", JSON.stringify(tasks));
    }

    console.log(task);

    mostrarTareas();
};

window.decrementarEstado = function (id) {
    const dato = localStorage.getItem("tareas");
    const tasks = JSON.parse(dato);

    const task = tasks.find(t => t.id===id);

    console.log(task);
    
    if(task) {
        if(task.estado == "3") {
            task.estado = "2";
        } else if(task.estado == "2") {
            task.estado = "1";
        }
        localStorage.setItem("tareas", JSON.stringify(tasks));
    }

    console.log(task);

    mostrarTareas();
};


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