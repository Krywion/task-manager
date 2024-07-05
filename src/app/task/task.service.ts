import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { Task } from "../core/models/task";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private tasks: Task[] = [
    { id: 1, title: 'Task 1', description: 'Description 1', done: true },
    { id: 2, title: 'Task 2', description: 'Description 2', done: false },
  ];
  private tasksSubject = new BehaviorSubject<Task[]>(this.tasks);

  getTasks() {
    return this.tasksSubject.asObservable();
  }

  addTask(task: Task) {
    this.tasks.push(task);
    this.tasksSubject.next(this.tasks);
    console.log(this.tasks);
  }

  updateTask(task: Task) {
    this.tasks = this.tasks.map(t => t.id === task.id ? task : t);
    this.tasksSubject.next(this.tasks);
  }

  deleteTask(taskId: number) {
    this.tasks = this.tasks.filter(t => t.id !== taskId);
    this.tasksSubject.next(this.tasks);
  }

  completeTask(taskId: number) {
    const task = this.tasks.find(t => t.id === taskId);
    if(task) {
      task.done = true;
      this.updateTask(task);
    }
  }
}
