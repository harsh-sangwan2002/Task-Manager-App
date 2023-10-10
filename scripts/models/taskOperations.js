const taskOperations = {

    tasks: [],
    isAsc: true,
    getTotalTasks() {

        return this.tasks.length;
    },
    getAllTasks() {

        return this.tasks;
    },
    convertObjectIntoTaskObject(tasks) {

        this.tasks = tasks.map(task => new Task(task.id, task.name, task.desc, task.date, task.url, task.pr));
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
    sort() {

        if (this.isAsc) {

            this.isAsc = !this.isAsc;
            return this.tasks.sort((first, second) => first.name.localeCompare(second.name));
        }

        else {

            this.isAsc = !this.isAsc;
            return this.tasks.sort((second, first) => first.name.localeCompare(second.name));
        }
    },

}