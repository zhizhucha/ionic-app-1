import { FirestoreService } from './../../services/data/firestore.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/user/auth.service';
import { Observable, of, pipe, } from 'rxjs';
import { map, filter, tap, mergeMap } from 'rxjs/operators'
import { List } from 'src/models/list';
import { Todo } from 'src/models/todo';
import { ModalController } from '@ionic/angular';
import { CreateTodoComponent } from '../../components/create-todo/create-todo.component';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.page.html',
  styleUrls: ['./todos.page.scss'],
})
export class TodosPage implements OnInit {

  private mListId : string;
  private hasWritePermission : boolean;
  public todos : Todo[];
  constructor(private modalController: ModalController,private activatedRoute : ActivatedRoute, private authService : AuthService, private firestoreService : FirestoreService) { }

  ngOnInit() {

    this.hasWritePermission = true; //TODO : improve permission
    this.mListId = this.activatedRoute.snapshot.params.listId;
    this.firestoreService.getTodoList(this.authService.getCurrentUser(), this.mListId).subscribe(
       (todos : Todo[]) => {
        //console.log("OnTodoInit : " + JSON.stringify(todos));
        if(todos !== undefined){
          this.todos = todos;
        }  
       
      }
    );    
  }

  onRemoveTodo(todoId : string): void{
    this.firestoreService.deleteTodo(this.mListId, todoId).then( res  => {
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
    return await modal.present();
  }



}
