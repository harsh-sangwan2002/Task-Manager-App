// Glue b/w View and Model
// Controller doing DOM input, output
window.addEventListener("load", init);

let taskObject;
const fields = ["id", "name", "desc", "date", "url", "pr"];
let incNumber;

function init() {

    countUpdate();
    bindEvents();
    incNumber = autoInc();
    printId();
}

const printId = () => document.querySelector("#id").innerText = incNumber.next().value;

function bindEvents() {

    document.querySelector('#add').addEventListener("click", addTask);
    document.querySelector('#delete').addEventListener("click", deleteTasks);
    document.querySelector('#update').addEventListener("click", updateTask);
    document.querySelector('#sort').addEventListener("click", sortTask);
    document.querySelector('#save').addEventListener("click", saveTask);
    document.querySelector('#load').addEventListener("click", loadTask);
    document.querySelector("#loadFromServer").addEventListener("click", loadFromServer);
    document.querySelector('#clear').addEventListener("click", clearTask);
    document.querySelector('#pr').addEventListener("click", updatePriority);
}

function loadFromServer() {

    const promise = doAjax();
    promise.then(res => {
        res.json().then(obj => {
            const taskList = obj["task"];

            taskOperations.convertObjectIntoTaskObject(taskList);
            printTasks();
            countUpdate();

        }).catch(err => {
            console.log(err);
        })
    }).catch(err => {
        console.log(err);
    })
}

function updatePriority() {

    document.querySelector("#current-pr").innerText = this.value;
}

function saveTask() {

    if (window.localStorage) {

        localStorage.tasks = JSON.stringify(taskOperations.getAllTasks());
        alert("Saved");
    }

    else {

        alert("Cannot save tasks!");
    }
}

function loadTask() {

    if (window.localStorage && window.localStorage.tasks) {

        let tasks = JSON.parse(localStorage.tasks);
        taskOperations.convertObjectIntoTaskObject(tasks);

        countUpdate();
        printTasks();
    }

    else {

        alert("Some error occurred!");
    }
}

function countUpdate() {

    let total = taskOperations.getTotalTasks();
    let mark = taskOperations.countMark();

    document.querySelector('#total-rec').innerText = total;
    document.querySelector('#marked-rec').innerText = mark;
    document.querySelector('#unmarked-rec').innerText = total - mark;
}

function sortTask() {

    taskOperations.sort();
    printTasks();
}

function clearTask() {

    for (let key of fields) {

        document.querySelector(`#${key}`).value = '';
    }

    document.querySelector("#name").focus();
}

function updateTask() {

    for (let key in taskObject) {

        if (key === 'markForDelete')
            continue;

        taskObject[key] = document.querySelector(`#${key}`).value;
    }

    printTasks();
}

function deleteTasks() {

    taskOperations.remove();
    countUpdate();
    printTasks();
}

function addTask() {

    const task = {};

    for (let field of fields) {

        if (field === "id") {
            task[field] = document.querySelector(`#${field}`).innerText;
            continue;
        }

        task[field] = document.querySelector(`#${field}`).value;
    }

    taskOperations.add(task);
    printTask(task);
    countUpdate();
    clearTask();
    printId(); 
}

function createIcon(className, fn, taskid) {

    let icon = document.createElement('i');
    icon.className = `fas ${className}`;
    icon.setAttribute("task-id", taskid);
    icon.addEventListener('click', fn);
    return icon;
}

function edit() {

    let id = this.getAttribute("task-id");
    taskObject = taskOperations.searchById(id);

    for (let key in taskObject) {

        if (key === 'markForDelete')
            continue;

        if(key==='id')
        document.querySelector(`#${key}`).innerText = taskObject[key];

        document.querySelector(`#${key}`).value = taskObject[key];
    }

}

function markForDelete() {

    let id = this.getAttribute("task-id");
    taskOperations.mark(id);

    let tr = this.parentNode.parentNode;
    tr.classList.add('alert');
    tr.classList.toggle('alert-danger');

    countUpdate();
}

function printTasks() {

    document.querySelector('#tasks').innerHTML = ``;

    let allTasks = taskOperations.getAllTasks();
    allTasks.forEach(printTask);
}

function printTask(task) {

    let tbody = document.querySelector('#tasks');
    let tr = tbody.insertRow();
    let idx = 0;

    for (let key in task) {

        if (key === 'markForDelete')
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