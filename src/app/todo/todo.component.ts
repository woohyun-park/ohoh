import { Component, OnInit } from '@angular/core';
import { Todo } from "../todo";
import { TodoService } from "../todo.service";
import { TitleService } from "../title.service";

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  todoText: string;

  constructor(public todoService: TodoService,
    public titleService: TitleService) { }

  ngOnInit(): void {

  }
}
