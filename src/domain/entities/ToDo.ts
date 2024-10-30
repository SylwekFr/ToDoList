export interface ToDo {
    description?: string;
    id: string;
    isCompleted: boolean;
    tasks: task[];
    title: string;
  }

interface task {
    description: string;
    isCompleted: boolean;
}