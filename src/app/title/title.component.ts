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
    titleService.streakTransfer.subscribe(streak => {
      this.streak = streak;
      console.log(streak);
    })
  }

  ngOnInit(): void {
    this.userName = this.titleService.userName;
    this.streak = this.titleService.streak;
    this.goal = this.titleService.goal;
  }

  updateStreak(): void{
    this.streak++;
    this.titleService.updateStreak();
  }

  updateUserName(): void {
    this.titleService.updateUserName(this.userName);
  }

  updateGoal(): void {
    this.titleService.updateGoal(this.goal);
  }
}
