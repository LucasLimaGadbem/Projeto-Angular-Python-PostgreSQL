import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: Task[] = [];
  private nextId = 1;

  getTasks(): Task[] {
    return this.tasks;
  }

  addTask(task: Omit<Task, 'id'>): void {
    this.tasks.push({ ...task, id: this.nextId++ });
  }

  removeTask(id: number): void {
    this.tasks = this.tasks.filter(task => task.id !== id);
  }

  toggleTaskCompletion(id: number): void {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      task.completed = !task.completed;
    }
  }

  filterTasks(status: 'all' | 'completed' | 'pending'): Task[] {
    if (status === 'completed') return this.tasks.filter(t => t.completed);
    if (status === 'pending') return this.tasks.filter(t => !t.completed);
    return this.tasks;
  }
}
