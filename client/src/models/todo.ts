import { Id } from "./types";

export interface Todo {
    name: string;
    completed: boolean;
    id: Id;
}