import { Component, OnInit } from '@angular/core';
import { TaskDataService } from 'src/app/services/task-data.service';
import { Task } from 'src/app/Model/task';
import { FormGroup, FormControl } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  
  newTaskForm = new FormGroup({
    taskName: new FormControl<string>(''),
    color: new FormControl<string>(''),
    date: new FormControl<string>(''),
    tags: new FormControl<string>(''),
  });
  constructor(private taskDataService: TaskDataService,private _snackBar:MatSnackBar) {}

  tasks?: Task[];
  completedTasks?: Task[];
  isVisible: boolean = false;
  currentDraggedCard: any = null;
  display: string = 'block';
  previousContainer: string = '';

  ngOnInit(): void {
    this.tasks = JSON.parse(this.taskDataService.getData('tasks')) || [];
    this.completedTasks =
      JSON.parse(this.taskDataService.getData('completed_tasks')) || [];
  }

  toggleVisibility(): void {
    if (this.isVisible == true) {
      this.isVisible = false;
    } else {
      this.isVisible = true;
    }
  }

  deleteTask(id: string, tasks: any, key: string) {
    tasks.splice(
      tasks.findIndex(function (i: any) {
        return i.id === id;
      }),
      1
    );

    this.taskDataService.saveData(key, JSON.stringify(tasks));
  }

  generateId(): string {
    return 'id' + new Date().getTime();
  }

  createNewTask(): void {
    if(this.newTaskForm.value.taskName && this.newTaskForm.value.date && this.newTaskForm.value.tags){
      this.tasks?.push({
        id: this.generateId(),
        title: this.newTaskForm.value.taskName || '',
        date: this.newTaskForm.value.date || '',
        color: this.newTaskForm.value.color || '#000000',
        tag: [this.newTaskForm.value.tags],
      });
      this.taskDataService.saveData('tasks', JSON.stringify(this.tasks));
      this.isVisible = false;
  
      this.newTaskForm.reset();
    }else{
      this._snackBar.open("Please enter the required fields",'',{
        duration: 2000
      });
    }
    
  }

  dragStart(task: Task, event: any): void {
    setTimeout(function () {
      event.path[0].style.display = 'none';
    }, 0);
    this.currentDraggedCard = task;
    this.previousContainer = event.path[2].id;
  }

  dragEnd(event: any): void {
    event.path[0].style.display = 'block';
  }

  dropMethod(event: any): void {
    if (event.path[0].id === 'tasks' && this.previousContainer !== 'tasks') {
      this.tasks?.push(this.currentDraggedCard);
      this.taskDataService.saveData('tasks', JSON.stringify(this.tasks));

      this.deleteTask(
        this.currentDraggedCard.id,
        this.completedTasks,
        'completed_tasks'
      );
    } else if (
      event.path[0].id === 'completed_tasks' &&
      this.previousContainer !== 'completed_tasks'
    ) {
      this.completedTasks?.push(this.currentDraggedCard);
      this.taskDataService.saveData(
        'completed_tasks',
        JSON.stringify(this.completedTasks)
      );
      this.deleteTask(this.currentDraggedCard.id, this.tasks, 'tasks');
    }
  }
}
