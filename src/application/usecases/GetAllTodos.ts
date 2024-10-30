import { inject, injectable } from 'tsyringe';
import type { ToDoRepository } from '../../domain/repositories/ToDoRepository';
import { ToDo } from '../../domain/entities/ToDo';


@injectable()
export class GetAllToDos {
  constructor(@inject('TaskRepository') private toDoRepository: ToDoRepository) {}

  async execute(): Promise<Partial<ToDo>[]> {
    return this.toDoRepository.getAllToDos();
  }
}