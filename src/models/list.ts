import {Todo} from './todo';

export class List {
    id: string;
    listName: string;
    listOwner: string;
    todos: Todo[];

    constructor(name: string, owner: string) {
        this.id = Math.random().toString(36).substr(2, 9);
        this.listName = name;
        this.listOwner = owner;
        this.todos = [];
    }
}
