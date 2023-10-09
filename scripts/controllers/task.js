// Glue b/w View and Model
// Controller doing DOM input, output
window.addEventListener("load", init);

function init() {

    countUpdate();
    bindEvents();
}

function bindEvents() {

    document.querySelector('#add').addEventListener("click", addTask);
    document.querySelector('#delete').addEventListener("click", deleteTasks);
}

function countUpdate() {

    let total = taskOperations.getTotalTasks();
    let mark = taskOperations.countMark();

    document.querySelector('#total-rec').innerText = total;
    document.querySelector('#marked-rec').innerText = mark;
    document.querySelector('#unmarked-rec').innerText = total - mark;
}

function deleteTasks(){

    taskOperations.remove();
    countUpdate();
    printTasks();
}

function addTask() {

    const fields = ["id", "name", "desc", "date", "url", "pr"];
    const task = {};

    for (let field of fields) {

        task[field] = document.querySelector(`#${field}`).value;
    }

    taskOperations.add(task);
    printTask(task);
    countUpdate();
}

function createIcon(className, fn, taskid) {

    let icon = document.createElement('i');
    icon.className = `fas ${className}`;
    icon.setAttribute("task-id", taskid);
    icon.addEventListener('click', fn);
    return icon;
}

function edit() {

}

function markForDelete() {

    let id = this.getAttribute("task-id");
    taskOperations.mark(id);

    let tr = this.parentNode.parentNode;
    tr.classList.add('alert');
    tr.classList.toggle('alert-danger');

    countUpdate();
}

function printTasks(){

    document.querySelector('#tasks').innerHTML = ``;

    let allTasks = taskOperations.getAllTasks(); 
    allTasks.forEach(printTask);
}

function printTask(task) {

    let tbody = document.querySelector('#tasks');
    let tr = tbody.insertRow();
    let idx = 0;

    for (let key in task) {

        if(key==='markForDelete')
        continue;
    
        tr.insertCell(idx).innerText = task[key];
        idx++;
    }

    let editIcon = createIcon('fa-edit me-2', edit, task.id);
    let deleteIcon = createIcon('fa-trash-alt', markForDelete, task.id);

    let td = tr.insertCell(idx);
    td.appendChild(editIcon);
    td.appendChild(deleteIcon);
}