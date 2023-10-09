// Glue b/w View and Model
// Controller doing DOM input, output
window.addEventListener("load",init);

function init(){

    countUpdate();
    bindEvents();
}

function bindEvents(){

    document.querySelector('#add').addEventListener("click",addTask);
}

function countUpdate(){

    document.querySelector('#total-rec').innerText = taskOperations.getTotalTasks();
}

function addTask(){

    const fields = ["id","name","desc","date","url","pr"];
    const task = {};

    for(let field of fields){

        task[field] = document.querySelector(`#${field}`).value;
    }

    taskOperations.add(task);
    printTask(task);
    countUpdate();
}

function printTask(task){

    let tbody = document.querySelector('#tasks');
    let tr = tbody.insertRow();
    let idx = 0;

    for(let key in task){

        tr.insertCell(idx).innerText = task[key];
        idx++;
    }
}