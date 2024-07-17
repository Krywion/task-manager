import {Component, HostListener} from '@angular/core';
import { TaskService } from "../task.service";
import {
  MatTableModule
} from "@angular/material/table";
import {MatButton} from "@angular/material/button";
import {MatDialog} from "@angular/material/dialog";
import {TaskFormComponent} from "../task-form/task-form.component";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatCardModule} from "@angular/material/card";
import {AsyncPipe} from "@angular/common";
import {TaskCardComponent} from "./task-card/task-card.component";


@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatButton,
    MatGridListModule,
    MatCardModule,
    AsyncPipe,
    TaskCardComponent
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {

  gridCols: number = 3;

  tasks$ = this.taskService.getTasks();
  displayedColumns: string[] = ['id', 'description', 'done', 'actions'];


  constructor(private taskService: TaskService, private dialog: MatDialog) {}

  onComplete(taksId: number) {
    console.log('Complete task with id: ', taksId);
    this.taskService.completeTask(taksId);
  }

  onDelete(taskId: number) {
    console.log('Delete task with id: ', taskId);
    this.taskService.deleteTask(taskId);
  }

  openDialog(task: any) {
    this.dialog.open(TaskFormComponent, {
      enterAnimationDuration: "100ms",
      width: '60%',
      data: task
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.updateGridCols();
  }

  updateGridCols() {
    const width = window.innerWidth;
    if (width <= 960) {
      this.gridCols = 1;
    } else if (width <= 1320) {
      this.gridCols = 2;
    } else {
      this.gridCols = 3;
    }
  }

}
