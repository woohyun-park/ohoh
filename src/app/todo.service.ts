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
    this.todos = localStorage.todos !== undefined ? JSON.parse(localStorage.todos) : [];
    this.id = localStorage.id !== undefined ? JSON.parse(localStorage.id) : 1;
    this.prevDate = localStorage.prevDate !== undefined ? JSON.parse(localStorage.prevDate) : this.getDateStr(new Date);

    this.resize();
    this.initDate();
  }

  resize(){
    window.addEventListener('resize', () => {
      this.runPerson();
      this.runLine();
    });
  }

  initDate(){
    //local에 prevDate가 없다면 오늘로 초기화한다
    if(localStorage.prevDate === undefined){
      this.prevDate = this.getDateStr(new Date);
      this.curDate = this.prevDate;
      localStorage.prevDate = this.prevDate;
    }
    //local에 prevDate가 있다면
    else{
      this.curDate = this.getDateStr(new Date);
      //만약 curDate와 prevDate가 하루차이 난다면
      //그리고 isUpdated가 true라면 어제 완료했다는 뜻이므로
      //isUpdated를 false로 초기화 및 streak은 유지
      //isUpdated가 false라면 어제 실패했다는 뜻이므로
      //streak은 0으로 set
      if(this.curDate - this.prevDate === 1){
        if(this.titleService.isUpdated === true){
          this.titleService.updateIsUpdated(false);
        } else{
          this.titleService.setStreak(0);
        }
        this.todos.forEach((n) => {
          this.updateIsFinished(n.id, false);
        });
      }
      //만약 하루 넘게 차이난다면
      //모든 todo를 실패로 바꾸고 streak은 0으로 초기화
      else if(this.curDate > this.prevDate){
        this.todos.forEach((n) => {
          this.updateIsFinished(n.id, false);
        });
        this.titleService.setStreak(0);
      }
      //변경점을 local에 업데이트
      this.updateDate();
    }
  }

  updateTodos(){
    localStorage.todos = JSON.stringify(this.todos);
  }

  updateId(){
    localStorage.id = JSON.stringify(this.id);
  }

  updateDate(){
    this.prevDate = this.curDate;
    localStorage.prevDate = JSON.stringify(this.prevDate);
  }

  updateIsFinished(id: number, isFinished: boolean){
    //findIndex를 사용하면 쉽게 객체의 indexOf를 구할 수 있다
    let index: number = this.todos.findIndex(i => i.id === id);
    this.todos[index].isFinished = isFinished;

    //isFinished가 변경되었으니 todos와 streak 또한 업데이트한다
    this.updateTodos();
    this.updateStreak();
  }

  updateStreak(){
    //isFinished가 false인 todo가 0개라면
    //모두 finished 되었다는 뜻이므로, streak을 +로 업데이트한다
    //그렇지 않다면 streak을 -로 업데이트한다
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

    //만약 오늘 streak이 더해진 상태라면
    //streak과 isUpdated를 -로 업데이트한다
    if(this.titleService.isUpdated === true){
      this.titleService.updateStreak(false);
      this.titleService.updateIsUpdated(false);
    }
  }

  deleteTodo(id: number){
    //id를 가진 객체의 인덱스를 기준으로 두개의 array로 slice한 후
    //하나의 array로 forEach를 이용하여 합쳐준다.
    let index: number = this.todos.findIndex(i => i.id === id);
    let tmp1: Todo[] = this.todos.slice(0, index);
    let tmp2: Todo[] = this.todos.slice(index + 1, this.todos.length);
    tmp2.forEach(n => tmp1.push(n));

    //todos를 업데이트한다
    this.todos = tmp1;
    this.updateTodos();
  }

  runLine(){
    //완료된 todo의 퍼센테이지를 구하여 진행도를 선으로 표시한다
    let numFinished: number = 0;
    this.todos.forEach(n => {
      if(n.isFinished === true){
        numFinished++;
      }
    });

    let width = parseInt(window.getComputedStyle(document.getElementsByClassName("todo__line")[0]).width);
    let ratio = numFinished / this.todos.length;
    return `translate(${width * ratio - width}px, -5px)`;
  }

  runPerson(){
    //완료된 todo의 퍼센테이지를 구하여 진행도를 달리는 사람으로 표시한다
    let numFinished: number = 0;
    this.todos.forEach(n => {
      if(n.isFinished === true){
        numFinished++;
      }
    });

    let width = parseInt(window.getComputedStyle(document.getElementsByClassName("todo__line")[0]).width);
    let ratio = numFinished / this.todos.length;
    return `${width * ratio + 50 * (width / 400) * (width / 400)}px`;
  }

  //날짜를 20210513과 같은 형식으로 변환해주는 함수
  getDateStr(date: Date){
    let month: any = date.getMonth() + 1;
    let day: any = date.getDate();

    if (month < 10) month = '0' + month;
    if (day < 10) day = '0' + day;

    return (date.getFullYear()+ "" + month + "" + day);
  }
}
