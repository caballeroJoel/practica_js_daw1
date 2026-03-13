/*********************** CARGA INICIAL ***************************/

export function mostrarTareas() {
    
    const dato = localStorage.getItem("tareas");
    const tareaLista = JSON.parse(dato) ?? [];
    
    const datoD = localStorage.getItem("depts");
    const deptsLista = JSON.parse(datoD) ?? [];

    let cont=0;

    tareaLista.forEach(task => {
        if(task.estado == "1") {
            cont++;
        }
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
        if(task.estado === "2") {
            cont++;
        }
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
        if(task.estado === "3") {
            cont++;
        }
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

        let pr;

        if(task.pr=="alta") pr="!!!";
        if(task.pr=="media") pr="!!";
        if(task.pr=="baja") pr="!";

        let html = `
        <div class="task">
            <p><span>#Tk_${task.id}</span>${task.tarea}</p>
            <div class="prp">
                <div>
                    <div class="prop">
                        <span class="prio_alta">${pr}</span>
                        <div class="users">
                            <img src="./img/user.png" alt="">
                            <img src="./img/user.png" alt="">
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

        if(task.estado=="1") {
            colPend.innerHTML+=html;
        }
        if(task.estado=="2") {
            colProc.innerHTML+=html;
        }
        if(task.estado=="3") {
            colFin.innerHTML+=html;
        }
    
    });
    
}
mostrarTareas();
export function cargarDeptUs() {
    const dato = localStorage.getItem("depts");
    const depars = JSON.parse(dato) ?? [];

    const listaDepts = document.querySelector("#ulDeparts");
    let html="";
    listaDepts.innerHTML='';

    depars.forEach(dept => {
        html = `
            <li style="background-color: #${dept.col};">${dept.dept}</li>
        `;
        listaDepts.innerHTML+=html;
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

console.log(localStorage);

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