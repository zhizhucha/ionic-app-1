import { FirestoreService } from './../../services/data/firestore.service';
import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/user/auth.service';
import { Todo } from 'src/models/todo';
import { ModalController, NavController } from '@ionic/angular';
import { CreateTodoComponent } from '../../components/create-todo/create-todo.component';
import { List } from 'src/models/list';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.page.html',
  styleUrls: ['./todos.page.scss'],
})
export class TodosPage implements OnInit {

  public mListId : string;
  public hasWritePermission : boolean;
  private dirtyUdpate : boolean;
  public todos : Todo[];
  constructor(public location: Location, private modalController: ModalController,private activatedRoute : ActivatedRoute, private authService : AuthService, private firestoreService : FirestoreService) { }
  @Input() creator : string;

  ngOnInit() {

    this.hasWritePermission = this.creator ===  this.authService.getCurrentUser().email?true:false;
    this.mListId = this.activatedRoute.snapshot.params.listId;
    this.firestoreService.getOneList(this.mListId).subscribe(
      (l : List) => {
        if(l.creator === this.authService.getCurrentUser().email){
          this.hasWritePermission = true;
        }else{
          this.hasWritePermission = false;
        }
      }
    );
    this.firestoreService.getTodoList(this.authService.getCurrentUser(), this.mListId).subscribe(
       (todos : Todo[]) => {
       // console.log("OnTodoInit : " + JSON.stringify(todos));
        if(todos !== undefined && (this.todos === undefined || this.dirtyUdpate)){
            this.todos = todos;
            this.dirtyUdpate = false;
        }
       });
  }

  onRemoveTodo(todoId : string): void{
    this.firestoreService.deleteTodo(this.mListId, todoId).then( res  => {
        for (var i = this.todos.length - 1; i >= 0; i--) {
          if(this.todos[i].id == todoId){
            this.todos.splice(i,1);
          }
        }
      },
      (err) => {
        console.log("Error : " + err);
      }
    );
  }

  async presentAddTodoModal() {
    const modal = await this.modalController.create({
      component: CreateTodoComponent,
      componentProps: { listId : this.mListId}
    });
    this.dirtyUdpate = true;
    return await modal.present();
  }

  onBack() {
    this.location.back();
  }

}
