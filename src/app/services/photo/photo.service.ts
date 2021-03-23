import { Injectable } from '@angular/core';
import { Plugins, CameraResultType, Capacitor, FilesystemDirectory, 
  CameraPhoto, CameraSource } from '@capacitor/core';

const { Camera, Filesystem, Storage } = Plugins;


export interface Photo {
  filepath: string;
  webviewPath: string;
}


@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  public photos: Photo[] = [];
  constructor() { }




  public async addNewToGallery() {
    // Take a photo
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri, 
      source: CameraSource.Camera, 
      quality: 100 
    });

    console.log("Photo is at : " + capturedPhoto.dataUrl + ", webPath ; " + capturedPhoto.webPath);


    //this.uploadImageToFirebase(capturedPhoto);
    
    this.photos.unshift({
      filepath: "soon...",
      webviewPath: capturedPhoto.webPath,
    });
    

  }


  /*
  public uploadImageToFirebase(imageURI: String){
 
    //uploads img to firebase storage
    this.uploadImage(imageURI)
    .then(photoURL => {
  
      let toast = this.toastCtrl.create({
        message: 'Image was updated successfully',
        duration: 3000
      });
      toast.present();
      })
    }

    uploadImage(imageURI){
      return new Promise<any>((resolve, reject) => {
        let storageRef = firebase.storage().ref();
        let imageRef = storageRef.child('image').child('imageName');
        this.encodeImageUri(imageURI, function(image64){
          imageRef.putString(image64, 'data_url')
          .then(snapshot => {
            resolve(snapshot.downloadURL)
          }, err => {
            reject(err);
          })
        })
      })
    }

    encodeImageUri(imageUri, callback) {
      var c = document.createElement('canvas');
      var ctx = c.getContext("2d");
      var img = new Image();
      img.onload = function () {
        var aux:any = this;
        c.width = aux.width;
        c.height = aux.height;
        ctx.drawImage(img, 0, 0);
        var dataURL = c.toDataURL("image/jpeg");
        callback(dataURL);
      };
      img.src = imageUri;
    };
    */

}


