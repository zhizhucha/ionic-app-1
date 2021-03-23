import {Todo} from './todo';

export class List {
    id: string;
    name: string;
    creator: string;
    canRead: string[];
    todos: Todo[];

    constructor(name: string, owner: string) {
        this.id = Math.random().toString(36).substr(2, 9);
        this.name = name;
        this.creator = owner;
        this.todos = [];
        this.canRead = [];
    }
}
