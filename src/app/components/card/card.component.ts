import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
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
