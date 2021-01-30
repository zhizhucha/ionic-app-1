import {Todo} from './todo';

export class List {
    id: string;
    name: string;
    todos: Todo[];

    constructor(name: string) {
        this.id = Math.random().toString(36).substr(2, 9);
        this.name = name;
        this.todos = [];
    }
}
