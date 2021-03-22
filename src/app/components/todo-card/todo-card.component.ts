import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo-card',
  templateUrl: './todo-card.component.html',
  styleUrls: ['./todo-card.component.scss'],
})
export class TodoCardComponent implements OnInit {

  @Input() title : string;
  @Input() description : string;
  @Input() isDone : boolean;
  @Input() dueDate : string;

  constructor() { 
    
  }

  
  ngOnInit() {

    //this.dueDate = null;
  }

}
