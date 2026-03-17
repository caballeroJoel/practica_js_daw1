import { mostrarTareas, cargarDeptUs } from "./funciones.js";

const btnTask = document.querySelector("#btnTask");
const btnDeptUser = document.querySelector("#btnDeptUser");

const formNewTask = document.querySelector("#formNewTask");
const popUserDept = document.querySelector("#popUserDept");
const editTaskPop = document.querySelector("#editTask");

const btnEditTask = document.querySelector("#btnEditTask");

const formBox = document.querySelector(".formBox");
const deptUser = document.querySelector(".containerDeptUser");

const btnNewTask = document.querySelector("#btnNewTask");
const btnNewDept = document.querySelector("#btnNewDept");
const btnNewUser = document.querySelector("#btnNewUser");

btnNewTask.addEventListener("click", function (e) {
    e.preventDefault();

    const tarea = document.querySelector("#tarea").value.trim();
    const prori = document.querySelector("#prori").value;
    const depart = document.querySelector("#depart").value;

    const selectColabo = document.querySelector("#colabo");
    const colabos = [...selectColabo.selectedOptions].map(option => Number(option.value));

    if (tarea !== "" && prori != "-" && depart != "-" && colabos.length > 0) {

        const form = document.querySelector(".formBox");
        const text = form.querySelector("textarea");
        const selects = form.querySelectorAll("select");

        text.classList.remove("error");
        selects.forEach(select => {
            select.classList.remove("error");
        });

        formNewTask.classList.add("hidde");

        const dato = localStorage.getItem("tareas");
        const tareaLista = JSON.parse(dato) ?? [];

        const id = tareaLista.length > 0
            ? Math.max(...tareaLista.map(t => Number(t.id))) + 1
            : 1;

        tareaLista.push({
            id: id,
            tarea: tarea,
            pr: prori,
            depart: depart,
            estado: "1",
            users: colabos
        });

        localStorage.setItem("tareas", JSON.stringify(tareaLista));

        const formTask = document.querySelector("#formTask");
        formTask.reset();

        mostrarTareas();

    } else {
        const form = document.querySelector(".formBox");
        const text = form.querySelector("textarea");
        const selects = form.querySelectorAll("select");

        if (tarea === "") {
            text.classList.add("error");
        } else {
            text.classList.remove("error");
        }

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

btnNewUser.addEventListener("click", function() {
    const newUser = document.querySelector("#newUser").value;
    
    const dato = localStorage.getItem("users");
    const users = JSON.parse(dato) ?? [];
    
    const numAleat = (Math.floor(Math.random() * 78))+1;

    const newId = users.length > 0
    ? Math.max(...users.map(u => Number(u.id))) + 1
    : 1;
    const newAvatar = "avatar_"+numAleat;

    // console.log(newAvatar);
    
    users.push({id: newId, name: newUser, avatar: newAvatar});
    
    // console.log(users);
    
    localStorage.setItem("users", JSON.stringify(users));
    
    cargarDeptUs();

});


window.elimUsr = function (id) {
    const dato = localStorage.getItem("users");
    const users = JSON.parse(dato) ?? [];

    const eliminar = users.filter(u => u.id !== id);

    localStorage.setItem("users", JSON.stringify(eliminar));

    cargarDeptUs();
    
}

window.elimDepart = function (name) {
    const dato = localStorage.getItem("depts");
    const departs = JSON.parse(dato) ?? [];

    const eliminar = departs.filter(u => u.dept !== name);

    localStorage.setItem("depts", JSON.stringify(eliminar));

    cargarDeptUs();
    
}

/******************* CAMBIAR ERSTADO DE TAREAS *********************/

window.aumentarEstado = function (id) {
    const dato = localStorage.getItem("tareas");
    const tasks = JSON.parse(dato);

    const task = tasks.find(t => t.id===id);
    
    if(task) {
        if(task.estado == "1") {
            task.estado = "2";
        } else if(task.estado == "2") {
            task.estado = "3";
        }
        localStorage.setItem("tareas", JSON.stringify(tasks));
    }

    mostrarTareas();
};

window.decrementarEstado = function (id) {
    const dato = localStorage.getItem("tareas");
    const tasks = JSON.parse(dato);

    const task = tasks.find(t => t.id===id);
    
    if(task) {
        if(task.estado == "3") {
            task.estado = "2";
        } else if(task.estado == "2") {
            task.estado = "1";
        }
        localStorage.setItem("tareas", JSON.stringify(tasks));
    }

    mostrarTareas();
};

window.editTaskView = function (id, e) {

    e.stopPropagation();

    editTaskPop.classList.remove("hidde");

    const dato1 = localStorage.getItem("tareas");
    const tareas = JSON.parse(dato1);

    const dato2 = localStorage.getItem("depts");
    const deps = JSON.parse(dato2);
    
    const dato3 = localStorage.getItem("users");
    const users = JSON.parse(dato3);

    const task = tareas.find(i=>i.id == id);

    let prori="";

    
    if(task.pr == "baja") {
        prori= `
            <option value="alta">!!! Alta</option>
            <option value="media">!! Media</option>
            <option value="baja" selected>! Baja</option>
        `;
    }
    if(task.pr == "media") {
        prori= `
            <option value="alta">!!! Alta</option>
            <option value="media" selected>!! Media</option>
            <option value="baja">! Baja</option>
        `;
    }
    if(task.pr == "alta") {
        prori= `
            <option value="alta" selected>!!! Alta</option>
            <option value="media">!! Media</option>
            <option value="baja">! Baja</option>
            `;
        }
        
    let user = "";
    users.forEach(usr => {
        const selected = task.users.includes(Number(usr.id)) ? "selected" : "";
        user += `<option value="${usr.id}" ${selected}>${usr.name}</option>`;
    });
        
    let depart = "";
    deps.forEach(dep => {
        if(dep.dept == task.depart) {
            depart +=`<option value="${dep.dept}" selected>${dep.dept}</option>`;
        } else {
            depart +=`<option value="${dep.dept}">${dep.dept}</option>`;
        }
    });
    
    
    
    let html = `
    <div class="editTaskContainer">
        <div class="tit">
            <div>
                <h2>Edit task Tk_${task.id}</h2>
            </div>
            <div>
                <button id="btnElimTask"><img src="./img/papelera.png" alt=""></button>
            </div>
        </div>
        <div class="cont">
            <div class="div_left">
                <div>
                    <label for="nameEdit">Nombre:</label>
                    <input type="text" id="nameEdit" value="${task.tarea}">
                    <input type="text" id="idEdit" value="${task.id}" style="display: none">
                </div>
                <div>
                    <label for="prioriEdit">Prioridad:</label>
                    <select name="prioriEdit" id="prioriEdit">
                        ${prori}
                    </select>
                </div>
            </div>
            <div class="div_right">
                <div>
                    <label for="deptEdit">Departamento:</label>
                    <select name="deptEdit" id="deptEdit">
                        ${depart}
                    </select>
                </div>
                <div>
                    <label for="colaboEdit">Colaboradores:</label>
                    <select name="colaboEdit" id="colaboEdit" multiple>
                    ${user}
                    </select>
                </div>
            </div>
        </div>
        <div class="send">
            <button id="btnEditar">Editar</button>
        </div>
    </div>
    `;

    editTaskPop.innerHTML = html;

}

document.addEventListener("click", function (e) {
    if (e.target.closest("#btnEditar")) {
        e.preventDefault();
        e.stopPropagation();

        const id = document.querySelector("#idEdit").value;
        const name = document.querySelector("#nameEdit").value;
        const prior = document.querySelector("#prioriEdit").value;
        const dept = document.querySelector("#deptEdit").value;
        const colabos = [...document.querySelector("#colaboEdit").selectedOptions].map(opt => Number(opt.value));

        const dato = localStorage.getItem("tareas");
        const tareas = JSON.parse(dato);

        let task = tareas.find(i=>i.id == id);
        
        task.tarea = name;
        task.pr = prior;
        task.depart = dept;
        task.users = colabos;

        localStorage.setItem("tareas", JSON.stringify(tareas));

        mostrarTareas();
        editTaskPop.classList.add("hidde");
    }
});

document.addEventListener("click", function (e) {
    if (e.target.closest("#btnElimTask")) {
        e.preventDefault();
        e.stopPropagation();

        const id = document.querySelector("#idEdit").value;

        const dato = localStorage.getItem("tareas");
        const tareas = JSON.parse(dato) ?? [];

        const eliminar = tareas.filter(u => u.id != id);


        localStorage.setItem("tareas", JSON.stringify(eliminar));

        mostrarTareas();
        editTaskPop.classList.add("hidde");

    }
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


/*************** FUNCION CLASES FORM CAMBIAR TASK ***************/

document.addEventListener("click", function (e) {
    const editTaskContainer = document.querySelector(".editTaskContainer");

    if (
        !editTaskPop.classList.contains("hidde") &&
        editTaskContainer &&
        !editTaskContainer.contains(e.target) &&
        !e.target.closest(".btnEditTask")
    ) {
        editTaskPop.classList.add("hidde");
    }
});

/**************************************************************/