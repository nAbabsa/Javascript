import { TodoService } from "./todo.service";
import { Id } from "./models/types";

export enum FILTER {
    ALL = 0,
    PENDING = 1,
    COMPLETED = 2
}

export class TodoController {
    private filter = FILTER.ALL;
    private service = TodoService.getInstance();

    /// Singleton
    private constructor() { }
    static instance?: TodoController;
    static getInstance(): TodoController {
        if (!this.instance) {
            this.instance = new TodoController();
        }
        return this.instance;
    }
    /// Singleton

    setFilter(filter: FILTER) {
        this.filter = filter;
    }

    getFilter() {
        return this.filter;
    }

    async getFilteredTodos() {
        const todos = await this.service.getTodos();

        if (this.filter === FILTER.ALL) {
            return todos;
        }
        return todos.filter(t => t.completed === (this.filter === FILTER.COMPLETED));
    }

    async createTodo(name: string) {
        return this.service.createTodo(name);
    }

    async deleteCompleted() {
        return this.service.deleteCompleted();
    }

    async delete(id: Id) {
        return this.service.delete(id);
    }

    async toggleTodo(id: Id) {
        return this.service.toggleTodo(id);
    }
}