import { ToDoRepository } from '../../domain/repositories/ToDoRepository';
import { ToDo } from '../../domain/entities/ToDo';
import Gun from 'gun';
import { injectable } from 'tsyringe';

@injectable()
export class GunToDoRepository implements ToDoRepository {
  private gun: any; // Initialize Gun instance

  constructor() {
    this.gun = Gun(); // Initialize Gun without a peer server
  }

  async getAllToDos(): Promise<Partial<ToDo>[]> {
    return new Promise((resolve) => {
      const toDos: Partial<ToDo>[] = [];
      this.gun.get('todos').map().on((data: Partial<ToDo>, key: string) => {
        if (data) {
          toDos.push({
            id: key,
            title: data.title,
            isCompleted: data.isCompleted,
          });
        }
      });
      setTimeout(() => resolve(toDos), 1000); 
    });
  }

  async getToDoById(id: string): Promise<ToDo | null> {
    return new Promise((resolve) => {
      this.gun.get(`todos/${id}`).once((data: ToDo) => {
        if (data) {
          resolve({
            description: data.description,
            id: id,
            isCompleted: data.isCompleted,
            tasks: data.tasks || [],
            title: data.title,
          });
        } else {
          resolve(null);
        }
      });
    });
  }

  async createToDo(toDo: ToDo): Promise<void> {
    return new Promise((resolve) => {
      this.gun.get(`todos/${toDo.id}`).put(toDo, () => resolve());
    });
  }

  async updateToDo(toDo: ToDo): Promise<void> {
    return new Promise((resolve) => {
      this.gun.get(`todos/${toDo.id}`).put({
        description: toDo.description,
        isCompleted: toDo.isCompleted,
        tasks: toDo.tasks,
        title: toDo.title,
      }, () => resolve());
    });
  }

  async deleteToDo(id: string): Promise<void> {
    return new Promise((resolve) => {
      this.gun.get(`todos/${id}`).put(null, () => resolve());
    });
  }
}
