import { inject, injectable } from 'tsyringe';
import type { ToDoRepository } from '../../domain/repositories/ToDoRepository';
import { ToDo } from '../../domain/entities/ToDo';


@injectable()
export class AddToDo {
  constructor(@inject('ToDoRepository') private toDoRepository: ToDoRepository) {}

  async execute(toDo: ToDo): Promise<void> {
    return this.toDoRepository.createToDo(toDo);
  }
}