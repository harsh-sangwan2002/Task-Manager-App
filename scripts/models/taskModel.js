class Task{

    constructor(id,name,desc,date,url,pr){

        this.id = id;
        this.name = name;
        this.desc = desc;
        this.date = date;
        this.url = url;
        this.pr = pr;
        this.markForDelete = false;
    }

    toggle(){

        this.markForDelete = !this.markForDelete;
    }
}