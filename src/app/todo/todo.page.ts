import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { List } from 'src/models/list';
import { CreateTodoComponent } from '../modals/create-todo/create-todo.component';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.page.html',
  styleUrls: ['./todo.page.scss'],
})
export class TodoPage implements OnInit {
  private todoList : List;
  myTodoTask : string;


  constructor(private modalController: ModalController) { }

  ngOnInit() {


  }



  addTodoTask() : void {
    //Add task to firebase 
    console.log("Add task : " + this.myTodoTask);
  }

}
