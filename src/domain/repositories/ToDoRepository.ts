import {ToDo} from '../entities/ToDo';

export interface ToDoRepository {
    getAllToDos(): Promise<Partial<ToDo>[]>;
    getToDoById(id: string): Promise<ToDo | null>;
    createToDo(todo: ToDo): Promise<void>;
    updateToDo(todo: ToDo): Promise<void>;
    deleteToDo(id: string): Promise<void>;
}
