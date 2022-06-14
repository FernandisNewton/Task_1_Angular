import { Component, OnInit } from '@angular/core';
import { TaskDataService } from 'src/app/services/task-data.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private taskDataService:TaskDataService) { }
  
  existingTasks:any = [];
  existingCompletedTasks:any = [];
  isVisible: string = "hidden";
  ngOnInit(): void {
     this.existingTasks = this.taskDataService.getData("tasks");
  }
  
  toggleVisibility():void{
    if (this.isVisible == "visible") {
      this.isVisible = "hidden";
    } else {
      this.isVisible = "visible";
    }
  }

}
