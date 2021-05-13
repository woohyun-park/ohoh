import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from "@angular/forms";

import { AppComponent } from './app.component';
import { TitleComponent } from './title/title.component';
import { TodoComponent } from './todo/todo.component';
import { TodoButtonComponent } from './todo-button/todo-button.component';

@NgModule({
  declarations: [
    AppComponent,
    TitleComponent,
    TodoComponent,
    TodoButtonComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
