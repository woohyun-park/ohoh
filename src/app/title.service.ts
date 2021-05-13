import { Injectable } from '@angular/core';
import { Subject, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TitleService {
  private userNameT = new Subject<string>();
  private streakT = new Subject<number>();
  private goalT = new Subject<string>();
  streakTransfer = this.streakT.asObservable();

  userName: string = "";
  streak: number = 1;
  goal: string = "";

  constructor() {
    this.userName = localStorage.userName !== undefined ? localStorage.userName : "";
    this.streak = localStorage.streak !== undefined ? localStorage.streak : 1;
    this.goal = localStorage.goal !== undefined ? localStorage.goal : "";
  }

  ngOnInit(){

  }

  sendStreak(streak: number){
    this.streakT.next(streak);
  }

  updateUserName(userName: string): void {
    this.userName = userName;
    localStorage.userName = this.userName;
  }

  updateStreak(): void {
    this.streak++;
    this.sendStreak(this.streak);
    localStorage.streak = this.streak;
  }

  updateGoal(goal: string): void {
    this.goal = goal;
    localStorage.goal = this.goal;
  }
}
