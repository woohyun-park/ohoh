import { Injectable } from '@angular/core';
import { Todo } from "./todo";
import { TitleService } from "./title.service";

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todos: Todo[];

  constructor(private titleService: TitleService) {
    console.log(localStorage.todos);
    this.todos = localStorage.todos !== undefined ? JSON.parse(localStorage.todos) : [];
  }

  ngOnInit(){

  }

  updateTodos(todos: Todo[]){
    console.log(this.todos);
    localStorage.todos = JSON.stringify(this.todos);
  }

  updateIsFinished(id: number, isFinished: boolean){
    this.todos[id-1].isFinished = !this.todos[id-1].isFinished;
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
