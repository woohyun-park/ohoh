import { Component, OnInit, Input } from '@angular/core';
import { TitleService } from "../title.service";

@Component({
  selector: 'app-todo-button',
  templateUrl: './todo-button.component.html',
  styleUrls: ['./todo-button.component.css']
})
export class TodoButtonComponent implements OnInit {
  @Input() todo: string;
  isSingleClick: Boolean = true;
  textColor: string = '#3C4AA7';
  bgColor: string = 'white';

  constructor(private titleService: TitleService) { }

  ngOnInit(): void {
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

    this.titleService.updateStreak();
  }

  getBGColor(): string{
    return this.bgColor;
  }

  getTextColor(): string{
    return this.textColor;
  }
}
