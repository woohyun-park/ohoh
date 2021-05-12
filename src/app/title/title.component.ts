import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css']
})

export class TitleComponent implements OnInit {
  userName: string = "";
  streak: number = 0;
  goal: string = ""

  constructor() { }

  ngOnInit(): void {
    if(localStorage.userName !== undefined)
      this.userName = localStorage.userName;
    if(localStorage.streak !== undefined)
      this.streak = localStorage.streak;
    if(localStorage.goal !== undefined)
      this.goal = localStorage.goal;
  }

  updateUserName(): void {
    localStorage.userName = this.userName;
  }

  updateStreak(): void {
    localStorage.streak = this.streak;
  }

  updateGoal(): void {
    localStorage.goal = this.goal;
  }
}
