import { Injectable } from '@angular/core';
import { Todo } from "./todo";
import { TitleService } from "./title.service";

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todos: Todo[];
  id: number;

  constructor(private titleService: TitleService) {
    // let tmp: Todo[] = [
    //   { id: 1, text: "자바스크립트 스킬업 1챕터", isFinished: false},
    //   { id: 2, text: "p5js 프로젝트", isFinished: false},
    //   { id: 3, text: "깃허브 커밋", isFinished: false}
    // ];
    // localStorage.todos = JSON.stringify(tmp);
    this.todos = localStorage.todos !== undefined ? JSON.parse(localStorage.todos) : [];
    this.id = localStorage.id !== undefined ? JSON.parse(localStorage.id) : 1;
  }

  ngOnInit(){

  }

  updateId(){
    localStorage.id = JSON.stringify(this.id);
  }

  updateTodos(){
    localStorage.todos = JSON.stringify(this.todos);
  }

  updateIsFinished(id: number, isFinished: boolean){
    let index: number;
    this.todos.forEach((a, i) => {
      if(a.id === id){
        index = i;
        return;
      }
    });
    this.todos[index].isFinished = isFinished;
    this.updateTodos();
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

  addTodo(text: string){
    let tmp: Todo = {id: this.id++, text: text, isFinished: false};
    this.todos.push(tmp);
    this.updateTodos();
    this.updateId();
    if(this.titleService.isUpdated === true){
      this.titleService.updateStreak(false);
      this.titleService.updateIsUpdated(false);
    }
  }

  deleteTodo(id: number){
    let index: number;
    this.todos.forEach((a, i) => {
      if(a.id === id){
        index = i;
        return;
      }
    });
    let tmp1: Todo[] = this.todos.slice(0, index);
    let tmp2: Todo[] = this.todos.slice(index + 1, this.todos.length);
    tmp2.forEach(n => tmp1.push(n));
    this.todos = tmp1;
    this.updateTodos();
  }
}
