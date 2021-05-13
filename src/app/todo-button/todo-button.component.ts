import { Component, OnInit, Input } from '@angular/core';
import { Todo } from "../todo";
import { TodoService } from "../todo.service";
import { TitleService } from "../title.service";

@Component({
  selector: 'app-todo-button',
  templateUrl: './todo-button.component.html',
  styleUrls: ['./todo-button.component.css']
})
export class TodoButtonComponent implements OnInit {
  @Input()
  todo: Todo;
  isSingleClick: Boolean = true;
  textColor: string = "#3C4AA7";
  bgColor: string = "white";
  curTextColor: string;
  curBgColor: string;

  constructor(private titleService: TitleService,
    private todoService: TodoService) { }

  ngOnInit(): void {
    this.curTextColor = this.todo.isFinished ? this.bgColor : this.textColor;
    this.curBgColor = this.todo.isFinished ? this.textColor : this.bgColor;
  }

  buttonOnClick(): void{
    this.isSingleClick = true;
      setTimeout(() => {
        if(this.isSingleClick){
          this.changeColor();
        }
      }, 250);
  }

  buttonOnDblclick(): void{
    this.isSingleClick = false;
    this.todoService.deleteTodo(this.todo.id);
  }

  changeColor(): void{
    this.curBgColor = this.curBgColor === this.textColor ? this.bgColor : this.textColor;
    this.curTextColor = this.curTextColor === this.textColor ? this.bgColor : this.textColor;
    this.todo.isFinished = !this.todo.isFinished
    this.todoService.updateIsFinished(this.todo.id, this.todo.isFinished);
  }

  getBGColor(): string{
    return this.curBgColor === undefined ? this.bgColor : this.curBgColor;
  }

  getTextColor(): string{
    return this.curTextColor === undefined ? this.textColor : this.curTextColor;
  }
}
