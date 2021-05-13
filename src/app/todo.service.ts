import { Injectable } from '@angular/core';
import { Todo } from "./todo";

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todos: Todo[];

  constructor() { }

  ngOnInit(){
    this.todos = [
      { id: 1, text: "자바스크립트 스킬업 1챕터",   isFinished: false },
      { id: 2, text: "p5js 프로젝트", isFinished: false },
      { id: 3, text: "깃허브 커밋", isFinished: false }
    ]
  }
}
