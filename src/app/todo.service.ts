import { Injectable } from '@angular/core';
import { Todo } from "./todo";
import { TitleService } from "./title.service";

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todos: Todo[];
  id: number;
  prevDate: any;
  curDate: any;

  constructor(private titleService: TitleService) {
    // let tmp: Todo[] = [
    //   { id: 1, text: "자바스크립트 스킬업 1챕터", isFinished: false},
    //   { id: 2, text: "p5js 프로젝트", isFinished: false},
    //   { id: 3, text: "깃허브 커밋", isFinished: false}
    // ];
    // localStorage.todos = JSON.stringify(tmp);
    this.todos = localStorage.todos !== undefined ? JSON.parse(localStorage.todos) : [];
    this.id = localStorage.id !== undefined ? JSON.parse(localStorage.id) : 1;
    this.prevDate = localStorage.prevDate !== undefined ? localStorage.prevDate : this.getDateStr(new Date);

    console.log("hi");
    if(localStorage.prevDate === undefined){
      this.prevDate = this.getDateStr(new Date);
      this.curDate = this.prevDate;
      localStorage.prevDate = this.prevDate;
    } else{
      this.curDate = this.getDateStr(new Date);
      if(this.curDate - this.prevDate === 1){
        if(this.titleService.isUpdated === true){
          this.titleService.updateIsUpdated(false);
        }
        this.todos.forEach((n) => {
          this.updateIsFinished(n.id, false);
        });
      } else if(this.curDate > this.prevDate){
        this.todos.forEach((n) => {
          this.updateIsFinished(n.id, false);
        });
        this.titleService.setStreakZero();
      }
      this.updateDate();
    }
    console.log(this.prevDate);
  }

  ngOnInit(){

  }

  updateDate(){
    this.prevDate = this.curDate;
    localStorage.prevDate = this.prevDate;
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

  runLine(){
    let numFinished: number = 0;
    this.todos.forEach(n => {
      if(n.isFinished === true){
        numFinished++;
      }
    });
    return `translate(${400*numFinished/this.todos.length-400}px, -5px)`;
  }

  runPerson(){
    let numFinished: number = 0;
    this.todos.forEach(n => {
      if(n.isFinished === true){
        numFinished++;
      }
    });
    return `${380*numFinished/this.todos.length + 50}px`;
  }

  getDateStr(date: Date){
    let month: any = date.getMonth() + 1;
    let day: any = date.getDate();

    if (month < 10) month = '0' + month;
    if (day < 10) day = '0' + day;

    return (date.getFullYear()+ "" + month + "" + day);
  }
}
