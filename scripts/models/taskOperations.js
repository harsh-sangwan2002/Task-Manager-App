const taskOperations = {

    tasks: [],
    getTotalTasks(){

        return this.tasks.length;
    },
    add(task) {

        let taskObject = new Task(task.id, task.name, task.desc, task.date, task.url, task.pr);
        this.tasks.push(taskObject);
        return this.tasks.length;
    },
    delete() { },
    serach() { },
    update() { },
    sort() { },

}