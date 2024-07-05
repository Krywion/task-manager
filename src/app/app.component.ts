import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskListComponent }  from "./task/task-list/task-list.component";
import { TaskFormComponent } from "./task/task-form/task-form.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TaskListComponent, TaskFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'task-manager';
}
