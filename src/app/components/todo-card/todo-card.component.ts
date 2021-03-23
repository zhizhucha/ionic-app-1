import { Component, Input, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { ModalController } from '@ionic/angular';
import { FirestoreService } from 'src/app/services/data/firestore.service';
import { UploadImageComponent } from '../upload-image/upload-image/upload-image.component';

@Component({
  selector: 'app-todo-card',
  templateUrl: './todo-card.component.html',
  styleUrls: ['./todo-card.component.scss'],
})
export class TodoCardComponent implements OnInit {

  @Input() listId : string;
  @Input() todoId : string;
  @Input() title : string;
  @Input() description : string;
  @Input() isDone : boolean;
  @Input() dueDate : string;
  @Input() hasImg : boolean;

  imgUrl : string;
  constructor(private modalController: ModalController,  private afStorage: AngularFireStorage) { 
    
  }

  
  ngOnInit() {
    console.log(" Component TodoId = " + this.todoId);
    //this.dueDate = null;
    const fileStoragePath = `filesStorage/${this.listId}/${this.todoId}`;
    this.afStorage.ref(fileStoragePath).getDownloadURL().subscribe((url) => {
      console.log("MyUrl = " + url);
      this.imgUrl = url;
    });
  }

  async addPhotoToGallery() {

    const modal =  await this.modalController.create({
      component: UploadImageComponent,
      componentProps: { listId : this.listId, todoId: this.todoId, hasImg : this.hasImg }
    });
    return await modal.present();

  }
  

}
