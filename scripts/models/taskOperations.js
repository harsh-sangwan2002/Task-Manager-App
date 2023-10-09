const taskOperations = {

    tasks: [],
    getTotalTasks() {

        return this.tasks.length;
    },
    getAllTasks() {

        return this.tasks;
    },
    add(task) {

        let taskObject = new Task(task.id, task.name, task.desc, task.date, task.url, task.pr);
        this.tasks.push(taskObject);
        return this.tasks.length;
    },
    mark(id) {

        let taskObject = this.searchById(id);
        if (taskObject) {

            taskObject.toggle();
        }
    },
    countMark() {

        return this.tasks.filter(task => task.markForDelete).length;
    },
    searchById(id) {

        return this.tasks.find(task => task.id === id);
    },
    remove() {

        this.tasks = this.tasks.filter(task => !task.markForDelete);
        return this.tasks;
    },
    serach() { },
    update() { },
    sort() { },

}