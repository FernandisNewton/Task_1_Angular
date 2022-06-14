import { Component, OnInit } from '@angular/core';
import { TaskDataService } from 'src/app/services/task-data.service';
import { Task } from 'src/app/Model/task';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private taskDataService:TaskDataService) { }
  
  existingTasks: Task[]= [];
  existingCompletedTasks: Task[] = [];
  isVisible: string = "hidden";

  ngOnInit(): void {
     this.existingTasks = this.taskDataService.getData("tasks");
     this.existingCompletedTasks = this.taskDataService.getData("completed_tasks")
  }
  
  toggleVisibility():void{
    if (this.isVisible == "visible") {
      this.isVisible = "hidden";
    } else {
      this.isVisible = "visible";
    }
  }

  taskData = [
    {
      title: "Modal error",
      date: "12/03/2022",
      color: "#F08080",
      tag: ["Bug", "Design"]
    },
    {
      title: "Modal error",
      date: "12/03/2022",
      color: "#F08080",
      tag: ["Bug", "Design"]
    },
    {
      title: "Modal error",
      date: "12/03/2022",
      color: "#F08080",
      tag: ["Bug", "Design"]
    },
  ]

}
