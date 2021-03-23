export class Todo {
    id: string;
    name: string;
    description: string;
    isDone: boolean;
    dueDate : Date;
    hasImg: boolean;

    constructor(name: string, description: string) {
        this.id = Math.random().toString(36).substr(2, 9);
        this.name = name;
        this.description = description;
        this.isDone = false;
        this.dueDate = null;
        this.hasImg = false;
    }
}
