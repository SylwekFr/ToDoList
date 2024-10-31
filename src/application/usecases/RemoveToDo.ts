import { inject, injectable } from 'tsyringe';
import type { ToDoRepository } from '../../domain/repositories/ToDoRepository';
import { ToDo } from '../../domain/entities/ToDo';


@injectable()
export class RemoveToDo {
  constructor(@inject('ToDoRepository') private toDoRepository: ToDoRepository) {}

  async execute(id: string): Promise<void> {
    return this.toDoRepository.deleteToDo(id);
  }
}