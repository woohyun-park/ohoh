import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css']
})
export class TitleComponent implements OnInit {
  userName: string = "dooddi";
  streak: number = 1;
  goal: string = "매일매일 프로그래밍"

  constructor() { }

  ngOnInit(): void {
  }

}
