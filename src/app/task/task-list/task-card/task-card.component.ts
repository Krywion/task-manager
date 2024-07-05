import {Component, EventEmitter, Input, input, Output} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {Task} from "../../../core/models/task";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [
    MatButton,
    MatCard,
    MatCardActions,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    CommonModule
  ],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.css'
})
export class TaskCardComponent {

  @Input() task: Task | undefined;
  @Output() delete = new EventEmitter<number>();
  @Output() edit = new EventEmitter<Task>();
  @Output() complete = new EventEmitter<number>();

  constructor() {}

  onComplete(taskId: number | undefined) {
    this.complete.emit(taskId);
  }

  onDelete(taskId: number | undefined) {
    this.delete.emit(taskId);
  }

  onEdit(task: Task | undefined) {
    this.edit.emit(task);
  }

}
