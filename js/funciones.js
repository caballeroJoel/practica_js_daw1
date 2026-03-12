export function mostrarTareas() {
    
    const dato = localStorage.getItem("tareas");
    const tareaLista = JSON.parse(dato) ?? [];

    let cabe = `
    <div class="cabe">
        <h2>Pendientes</h2>
        <div class="cont">
            <span>5</span>
        </div>
    </div>
    `;
    colPend.innerHTML=cabe;

    cabe = `
    <div class="cabe">
        <h2>En proceso</h2>
        <div class="cont">
            <span>5</span>
        </div>
    </div>
    `;
    colProc.innerHTML=cabe;
    
    cabe = `
    <div class="cabe">
        <h2>Finalizadas</h2>
        <div class="cont">
            <span>5</span>
        </div>
    </div>
    `;
    colFin.innerHTML=cabe;

    tareaLista.forEach(task => {

        let pr;

        if(task.pr=="alta") pr="!!!";
        if(task.pr=="media") pr="!!";
        if(task.pr=="baja") pr="!";

        let html = `
        <div class="task">
            <p><span>#T123</span>${task.tarea}</p>
            <div>
                <div class="prop">
                    <span class="prio_alta">${pr}</span>
                    <div class="users">
                        <img src="./img/user.png" alt="">
                        <img src="./img/user.png" alt="">
                    </div>
                </div>
                <div class="depart">
                    <p>${task.depart}</p>
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

function cargarDeptUs() {
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

console.log(localStorage);