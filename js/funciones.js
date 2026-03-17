/*********************** CARGA INICIAL ***************************/

export function mostrarTareas() {
    
    const dato = localStorage.getItem("tareas");
    const tareaLista = JSON.parse(dato) ?? [];
    
    const datoD = localStorage.getItem("depts");
    const deptsLista = JSON.parse(datoD) ?? [];
    
    const datoU = localStorage.getItem("users");
    const usersLista = JSON.parse(datoU) ?? [];

    let cont=0;

    tareaLista.forEach(task => {
        if(task.estado == "1") cont++;
    });
    
    let cabe = `
    <div class="cabe">
        <h2>Pendientes</h2>
        <div class="cont">
            <span>${cont}</span>
        </div>
    </div>
    `;
    colPend.innerHTML=cabe;

    cont=0;
    tareaLista.forEach(task => {
        if(task.estado === "2") cont++;
    });
    
    cabe = `
    <div class="cabe">
    <h2>En proceso</h2>
        <div class="cont">
            <span>${cont}</span>
        </div>
    </div>
    `;
    colProc.innerHTML=cabe;
        
    cont=0;
    tareaLista.forEach(task => {
        if(task.estado === "3") cont++;
    });
    cabe = `
    <div class="cabe">
        <h2>Finalizadas</h2>
        <div class="cont">
            <span>${cont}</span>
        </div>
    </div>
    `;
    colFin.innerHTML=cabe;

    tareaLista.forEach(task => {

        const deptEncontrado = deptsLista.find(d => d.dept === task.depart);
        const colorDept = deptEncontrado ? deptEncontrado.col : "999999";

        let pr = "", 
            col = "";

        if(task.pr=="alta") pr="!!!";
        if(task.pr=="media") pr="!!";
        if(task.pr=="baja") pr="!";


        const usersTask = task.users ?? [];

        for (let i = 0; i < usersTask.length; i++) {
            const userId = Number(usersTask[i]);
            const user = usersLista.find(u => Number(u.id) === userId);

            if (user) {
                col += `<img src="./img/avatares/${user.avatar}.png" alt="${user.name}" title="${user.name}">`;
            }
        }

        let html = `
        <div class="task">
            <div class="titedit">
                <div>
                    <p><span>#Tk_${task.id}</span>${task.tarea}</p>
                </div>
                <div class="edit">
                    <button id="btnEditTask" onclick="editTaskView('${task.id}', event)"><img src="./img/editar.png"></button>
                </div>
            </div>
            <div class="prp">
                <div>
                    <div class="prop">
                        <span class="prio_alta">${pr}</span>
                        <div class="users">
                            ${col}
                        </div>
                    </div>
                    <div class="depart" style="background-color: #${colorDept}">
                        <p>${task.depart}</p>
                    </div>
                </div>
                <div class="cambio">
                    <button onclick="aumentarEstado(${task.id})"><img src="./img/flch_derech.png"></button>
                    <button onclick="decrementarEstado(${task.id})"><img src="./img/flch_izqui.png"></button>
                </div>
            </div>
        </div>
        `;

        if(task.estado=="1") colPend.innerHTML+=html;
        
        if(task.estado=="2") colProc.innerHTML+=html;

        if(task.estado=="3") colFin.innerHTML+= html;
    
    });
    
}
mostrarTareas();

export function cargarDeptUs() {
    const dato1 = localStorage.getItem("depts");
    const depars = JSON.parse(dato1) ?? [];

    const listaDepts = document.querySelector("#ulDeparts");

    const dato2 = localStorage.getItem("users");
    const users = JSON.parse(dato2) ?? [];

    const listaUsers = document.querySelector("#ulUsers");
    let html="";


    listaDepts.innerHTML='';
    listaUsers.innerHTML='';

    depars.forEach(dept => {
        html = `
            <li class="departs">
                <div class="dep" style="background-color: #${dept.col};">
                    <p>${dept.dept}</p>
                </div>
                <div class="pap">
                    <button onclick="elimDepart('${dept.dept}')"><img src="./img/papelera.png" alt=""></button>
                </div>
            </li>
        `;
        listaDepts.innerHTML+=html;
    });

    users.forEach(usr => {
        html = `
            <li>
                <div class="usr">
                    <img src="./img/avatares/${usr.avatar}.png" alt="">
                    <p>${usr.name}</p>
                </div>
                <div class="pap">
                    <button onclick="elimUsr(${usr.id})"><img src="./img/papelera.png" alt=""></button>
                </div>
            </li>
        `;
        listaUsers.innerHTML+=html;
    });

}
cargarDeptUs();

/*****************************************************************/


/************************* CAMBIO TEMA ***************************/

const tema = document.querySelector("#cambTema");

tema.addEventListener("click", cambioTema);

function aplicarTema() {
    const temaU = localStorage.getItem("tema");

    if(temaU == "dark") {
        document.body.classList.add("dark");
        tema.innerHTML = '<img src="./img/soleado.png" alt="">';
    } else {
        tema.innerHTML = '<img src="./img/luna.png" alt="">';
    }

}
function cambioTema() {
    document.body.classList.toggle("dark");

    let temaNew;

    if (!document.body.classList.contains("dark")) {
        tema.innerHTML = '<img src="./img/luna.png" alt="">';
        temaNew = "light";
    } else {
        tema.innerHTML = '<img src="./img/soleado.png" alt="">';
        temaNew = "dark";
    }
}
aplicarTema();

/*****************************************************************/


function mostrarDeps() {
    const listaDepts = document.querySelector("#depart");

    let html="";
    listaDepts.innerHTML='<option value="-" default>---</option>';

    const dato = localStorage.getItem("depts");
    const dep = JSON.parse(dato) ?? [];

    dep.forEach(depart => {
        html+=`<option value="${depart.dept}">${depart.dept}</option>`;
    });

    listaDepts.innerHTML+=html;

}
mostrarDeps();

function mostrarUsers() {
    const listaUsers = document.querySelector("#colabo");

    let html="";
    listaUsers.innerHTML='<option value="-" default>---</option>';

    const dato = localStorage.getItem("users");
    const user = JSON.parse(dato) ?? [];

    user.forEach(usr => {
        html+=`<option value="${usr.id}">${usr.name}</option>`;
    });

    listaUsers.innerHTML+=html;

}
mostrarUsers();

console.log(localStorage);

// localStorage.clear();