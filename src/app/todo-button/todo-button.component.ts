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
  textColor: string;
  bgColor: string;

  constructor(private titleService: TitleService,
    private todoService: TodoService) { }

  ngOnInit(): void {
    this.textColor = this.todo.isFinished ? 'white' : '#3C4AA7';
    this.bgColor = this.todo.isFinished ? '#3C4AA7' : 'white';
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
    console.log("dbclicked");
  }

  changeColor(): void{
    this.bgColor = this.bgColor === '#3C4AA7' ? 'white' : '#3C4AA7';
    this.textColor = this.textColor === '#3C4AA7' ? 'white' : '#3C4AA7';
    this.todo.isFinished = !this.todo.isFinished
    console.log(this.todo.isFinished);
    this.todoService.updateIsFinished(this.todo.id, this.todo.isFinished);
    // this.todoService.
    // this.titleService.updateStreak(Todo.id);
  }

  getBGColor(): string{
    return this.bgColor;
  }

  getTextColor(): string{
    return this.textColor;
  }
}
