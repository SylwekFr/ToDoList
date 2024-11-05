import { container } from 'tsyringe';
import { ToDoRepository } from '../domain/repositories/ToDoRepository';
import { GunToDoRepository } from '../infrastructure/gun/GunToDoRepository';

export function configureDependencies() {
  container.register<ToDoRepository>('TaskRepository', {
    useClass: GunToDoRepository,
  });
}