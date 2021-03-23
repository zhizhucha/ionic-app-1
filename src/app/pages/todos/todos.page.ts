import { UploadImageComponent } from './../../components/upload-image/upload-image/upload-image.component';
import { FirestoreService } from './../../services/data/firestore.service';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/user/auth.service';
import { Todo } from 'src/models/todo';
import { ModalController, NavController } from '@ionic/angular';
import { CreateTodoComponent } from '../../components/create-todo/create-todo.component';
import { Plugins, CameraResultType, Capacitor, FilesystemDirectory, 
  CameraPhoto, CameraSource } from '@capacitor/core';
import { PhotoService } from '../../services/photo/photo.service';

const { Camera, Filesystem, Storage } = Plugins;
@Component({
  selector: 'app-todos',
  templateUrl: './todos.page.html',
  styleUrls: ['./todos.page.scss'],
})
export class TodosPage implements OnInit {

  private mListId : string;
  private hasWritePermission : boolean;
  public todos : Todo[];
  public photo : any;
  constructor(public photoService: PhotoService, public location: Location, private modalController: ModalController,private activatedRoute : ActivatedRoute, private authService : AuthService, private firestoreService : FirestoreService) { }

  ngOnInit() {

    this.hasWritePermission = true; //TODO : improve permission
    this.mListId = this.activatedRoute.snapshot.params.listId;
    this.firestoreService.getTodoList(this.authService.getCurrentUser(), this.mListId).subscribe(
       (todos : Todo[]) => {
        console.log("OnTodoInit : " + JSON.stringify(todos));
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

  onBack() {
    this.location.back();
  }




}
