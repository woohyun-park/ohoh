import { Injectable } from '@angular/core';
import { Subject, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TitleService {
  private message = new Subject<number>();
  messageTransfer = this.message.asObservable();

  userName: string = "";
  streak: number = 1;
  goal: string = "";
  isUpdated: boolean = false;

  constructor() {
    this.userName = localStorage.userName !== undefined ? localStorage.userName : "";
    this.streak = localStorage.streak !== undefined ? localStorage.streak : 1;
    this.goal = localStorage.goal !== undefined ? localStorage.goal : "";
    this.isUpdated = JSON.parse(localStorage.isUpdated);
  }

  sendStreak(streak: number){
    this.message.next(streak);
  }

  updateUserName(userName: string): void {
    this.userName = userName;
    localStorage.userName = this.userName;
  }

  updateStreak(isPositive: boolean): void {
    console.log(this.isUpdated, isPositive);
    if(!this.isUpdated && isPositive){
      this.streak++;
      this.sendStreak(this.streak);
      localStorage.streak = this.streak;
      this.isUpdated = true;
      localStorage.isUpdated = this.isUpdated;
    } else if(this.isUpdated && !isPositive){
      this.streak--;
      this.sendStreak(this.streak);
      localStorage.streak = this.streak;
      this.isUpdated = false;
      localStorage.isUpdated = this.isUpdated;
    }
  }

  updateGoal(goal: string): void {
    this.goal = goal;
    localStorage.goal = this.goal;
  }
}
