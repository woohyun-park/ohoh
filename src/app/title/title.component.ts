import { Component, OnInit } from '@angular/core';
import { TitleService } from "../title.service";

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css']
})

export class TitleComponent implements OnInit {
  userName: string;
  streak: number;
  goal: string;

  constructor(private titleService: TitleService) {
    //titleService에서 바뀌는 streak을 구독
    titleService.messageTransfer.subscribe(streak => {
      this.streak = streak;
    })
  }

  ngOnInit(): void {
    this.userName = this.titleService.userName;
    this.streak = this.titleService.streak;
    this.goal = this.titleService.goal;
  }

  updateUserName(): void {
    this.titleService.updateUserName(this.userName);
  }

  updateStreak(): void{
    this.titleService.updateStreak(true);
  }

  updateGoal(): void {
    this.titleService.updateGoal(this.goal);
  }

  addStreak(): void{
    this.streak++;
    this.updateStreak();
  }
}
