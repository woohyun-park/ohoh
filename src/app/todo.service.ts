import { Injectable } from '@angular/core';
import { Todo } from "./todo";
import { TitleService } from "./title.service";

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todos: Todo[];

  constructor(private titleService: TitleService) {
    // let tmp: Todo[] = [
    //   { id: 1, text: "자바스크립트 스킬업 1챕터", isFinished: false},
    //   { id: 2, text: "p5js 프로젝트", isFinished: false},
    //   { id: 3, text: "깃허브 커밋", isFinished: false}
    // ];
    // localStorage.todos = JSON.stringify(tmp);
    this.todos = localStorage.todos !== undefined ? JSON.parse(localStorage.todos) : [];
  }

  ngOnInit(){

  }

  updateTodos(todos: Todo[]){
    console.log(this.todos);
    localStorage.todos = JSON.stringify(this.todos);
  }

  updateIsFinished(id: number, isFinished: boolean){
    this.todos[id-1].isFinished = isFinished;
    this.updateTodos(this.todos);
    this.updateStreak();
  }

  updateStreak(){
    if(this.todos.filter(n => {
      return !n.isFinished;
    }).length === 0){
      this.titleService.updateStreak(true);
    } else {
      this.titleService.updateStreak(false);
    }
  }
}
