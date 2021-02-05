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
  constructor(private modalController: ModalController) { }

  ngOnInit() {


  }


  async showNewListModal() {
    const modal = await this.modalController.create({
      component: CreateTodoComponent
    });
    return await modal.present();
  }

}
