import { FirestoreService } from './../../../services/data/firestore.service';
import { PhotoService } from './../../../services/photo/photo.service';
import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';




export interface imgFile {
  name: string;
  filepath: string;
  size: number;
}


@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss'],
})
export class UploadImageComponent implements OnInit {




   // File upload task 
   fileUploadTask: AngularFireUploadTask;

   // Upload progress
   percentageVal: Observable<number>;
 
   // Track file uploading with snapshot
   trackSnapshot: Observable<any>;
 
   // Uploaded File URL
   UploadedImageURL: Observable<string>;
 
   // Uploaded image collection
   files: Observable<imgFile[]>;
 
   // Image specifications
   imgName: string;
   imgSize: number;
 
   // File uploading status
   isFileUploading: boolean;
   isFileUploaded: boolean;

   private filesCollection: AngularFirestoreCollection<imgFile>;

   imgUrl : string;
  
  @Input() listId : string;
  @Input() todoId : string;
  @Input() hasImg : string;
  constructor(public photoService : PhotoService, private mfires : FirestoreService,  private afs: AngularFirestore,
    private afStorage: AngularFireStorage) {

    this.isFileUploading = false;
    this.isFileUploaded = false;
    
    // Define uploaded files collection
    this.filesCollection = afs.collection<imgFile>('imagesCollection');
    this.files = this.filesCollection.valueChanges();
   }

   

  ngOnInit() {
    if(this.hasImg){
      
      const fileStoragePath = `filesStorage/${this.listId}/${this.todoId}`;
      console.log("ImageAccess =" + fileStoragePath);
      this.afStorage.ref(fileStoragePath).getDownloadURL().subscribe((url) => {
        console.log("MyUrl = " + url);
        this.imgUrl = url;
      });
    }
    
   

  }
  

  uploadImage(event: FileList) {
      
    const file = event.item(0)

    // Image validation
    if (file.type.split('/')[0] !== 'image') { 
      console.log('File type is not supported!')
      return;
    }

    this.isFileUploading = true;
    this.isFileUploaded = false;

    this.imgName = file.name;

    // Storage path
    const fileStoragePath = `filesStorage/${this.listId}/${this.todoId}`;
    

    // Image reference
    const imageRef = this.afStorage.ref(fileStoragePath);
    console.log(" Storing FILES2 : imgRef : " + imageRef);
    // File upload task

    this.fileUploadTask = this.afStorage.upload(fileStoragePath, file);
    imageRef.getDownloadURL().subscribe((url) => {
      console.log(url);
      this.imgUrl = url;
      this.mfires.updateImage(this.listId, this.todoId, true).then( () => {
        console.log("Updated list : " + this.listId + " --> todo : " + this.todoId + " with = " );
        
      }, (err) => {
        console.log(" Error updateing");
      })
    });


    
    console.log(" Storing FILES3");
    // Show uploading progress
    this.percentageVal = this.fileUploadTask.percentageChanges();
    this.trackSnapshot = this.fileUploadTask.snapshotChanges().pipe(
      
      finalize(() => {
        // Retreive uploaded image storage path
        this.UploadedImageURL = imageRef.getDownloadURL();
        this.UploadedImageURL.subscribe(resp=>{
          this.storeFilesFirebase({
            name: file.name,
            filepath: resp,
            size: this.imgSize
          });
          this.isFileUploading = false;
          this.isFileUploaded = true;
        },error=>{
          console.log(error);
        })
      }),
      tap(snap => {
          this.imgSize = snap.totalBytes;
      })
    )
}

  storeFilesFirebase(image: imgFile) {
    const fileId = this.afs.createId();
    this.filesCollection.doc(fileId).set(image).then(res => 
      {
      console.log(res);
      }
    ).catch(err => {
      console.log(err);
    });
}

}
