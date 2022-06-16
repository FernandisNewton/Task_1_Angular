import { Component, OnInit } from '@angular/core';
import { TaskDataService } from 'src/app/services/task-data.service';
import { Task } from 'src/app/Model/task';
import { FormGroup, FormControl } from '@angular/forms';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  newTaskForm = new FormGroup({
    taskName: new FormControl(''),
    color: new FormControl(''),
    date: new FormControl(''),
    tags: new FormControl(''),
  });
  constructor(private taskDataService: TaskDataService) {}

  tasks?: Task[];
  completedTasks?: Task[];
  isVisible: string = 'hidden';
  currentDraggedCard: any = null;
  display: string = 'block';

  ngOnInit(): void {
    this.tasks = JSON.parse(this.taskDataService.getData('tasks')) || [];
    this.completedTasks =
      JSON.parse(this.taskDataService.getData('completed_tasks')) || [];
  }

  toggleVisibility(): void {
    if (this.isVisible == 'visible') {
      this.isVisible = 'hidden';
    } else {
      this.isVisible = 'visible';
    }
  }

  deleteTask(id: string, tasks: any, key: string) {
    tasks.splice(
      tasks.findIndex(function (i: any) {
        console.log(i.id);
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
    this.tasks?.push({
      id: this.generateId(),
      title: this.newTaskForm.value.taskName || '',
      date: this.newTaskForm.value.date || '',
      color: this.newTaskForm.value.color || '',
      tag: [this.newTaskForm.value.tags],
    });
    this.taskDataService.saveData('tasks', JSON.stringify(this.tasks));
    this.isVisible = 'hidden';
    
    this.newTaskForm.reset();
  }

  dragStart(task: Task, event: any): void {
    setTimeout(function () {
      event.path[0].style.display = 'none';
    }, 0);
    this.currentDraggedCard = task;
  }

  dragEnd(event: any): void {
    event.path[0].style.display = 'block';
  }

  dropMethod(event: any): void {
    if (event.path[0].className === 'cardContainer tasks') {
      this.tasks?.push(this.currentDraggedCard);
      this.taskDataService.saveData('tasks', JSON.stringify(this.tasks));

      this.deleteTask(
        this.currentDraggedCard.id,
        this.completedTasks,
        'completed_tasks'
      );
    } else if (event.path[0].className === 'cardContainer completed_tasks') {
      this.completedTasks?.push(this.currentDraggedCard);
      this.taskDataService.saveData(
        'completed_tasks',
        JSON.stringify(this.completedTasks)
      );
      this.deleteTask(this.currentDraggedCard.id, this.tasks, 'tasks');
    }
  }
}
