import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {TaskService} from "../task.service";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatButton,
    MatDialogModule
  ],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent implements OnInit{

  taskForm: FormGroup;
  inputData: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private taskService: TaskService,
    private ref: MatDialogRef<TaskFormComponent>
  ) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.inputData = this.data;
    if(this.inputData) {
      console.log('Editing');
      this.taskForm.patchValue({
        title: this.inputData.title,
        description: this.inputData.description
        }
      )
    } else {
      console.log('Adding');
    }

  }

  onSubmit() {
    if(this.taskForm.valid) {
      if(this.inputData) {
        // Update the task
        const updatedTask = { ...this.inputData, ...this.taskForm.value };
        this.taskService.updateTask(updatedTask);
        this.ref.close();
      }
      else {
        // Add the task
        const newTask = {
          id: this.hashTaskId(this.taskForm.value.title),
          ...this.taskForm.value,
          done: false
        };
        this.taskService.addTask(newTask);
        this.ref.close();
      }
    }
  }

  // This is a simple hash function to generate a unique id for a task
  hashTaskId(title: string): number {
    let hash = 0;
    for (let i = 0; i < title.length; i++) {
      hash = (hash << 5) - hash + title.charCodeAt(i);
      hash = hash & hash;
    }
    return hash;
  }


}
