import { Component, OnInit } from '@angular/core';
import { TodoService } from "../todo.service";

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  todos: string[] = ["자바스크립트 스킬업 1챕터", "p5js 프로젝트", "깃허브 커밋"];
  constructor() { }

  ngOnInit(): void {
  }
}
