import { inject, injectable } from 'tsyringe';
import type { ToDoRepository } from '../../domain/repositories/ToDoRepository';
import { ToDo } from '../../domain/entities/ToDo';


@injectable()
export class AddToDos {
  constructor(@inject('TaskRepository') private toDoRepository: ToDoRepository) {}

  async execute(toDo: ToDo): Promise<void> {
    return this.toDoRepository.createToDo(toDo);
  }
}