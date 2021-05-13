import { Injectable } from '@angular/core';
import { Subject, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TitleService {
  private message = new Subject<number>();
  messageTransfer = this.message.asObservable();

  userName: string;
  streak: number;
  goal: string;
  isUpdated: boolean;

  constructor() {
    this.userName = localStorage.userName !== undefined ? JSON.parse(localStorage.userName) : "";
    this.streak = localStorage.streak !== undefined ? JSON.parse(localStorage.streak) : 0;
    this.goal = localStorage.goal !== undefined ? JSON.parse(localStorage.goal) : "";
    this.isUpdated = localStorage.isUpdated !== undefined ? JSON.parse(localStorage.isUpdated) : false;
  }

  ngOnInit(){

  }

  sendStreak(streak: number){
    this.message.next(streak);
  }

  setStreak(n: number){
    this.streak = n;
    localStorage.streak = JSON.stringify(n);
  }

  updateUserName(userName: string): void {
    this.userName = userName;
    localStorage.userName = JSON.stringify(this.userName);
  }

  updateStreak(isPositive: boolean): void {
    if(!this.isUpdated && isPositive){
      //현재 streak과 localStorage의 streak을 업데이트
      this.streak++;
      localStorage.streak = this.streak;
      //현재 isUpdated와 localStorage의 isUpdated를 업데이트
      this.isUpdated = true;
      localStorage.isUpdated = this.isUpdated;
      //streak이 업데이트되었음을 title에 알려줌
      this.sendStreak(this.streak);
    } else if(this.isUpdated && !isPositive){
      //위와 동일
      this.streak--;
      localStorage.streak = this.streak;
      this.isUpdated = false;
      localStorage.isUpdated = this.isUpdated;
      this.sendStreak(this.streak);
    }
  }

  updateGoal(goal: string): void {
    this.goal = goal;
    localStorage.goal = JSON.stringify(this.goal);
  }

  updateIsUpdated(isUpdated: boolean){
    this.isUpdated = isUpdated;
    localStorage.isUpdated = JSON.stringify(this.isUpdated);
  }
}
