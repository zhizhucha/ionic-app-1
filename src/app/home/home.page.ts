import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { AuthService } from '../services/user/auth.service';
import {FirestoreService} from '../services/data/firestore.service';
import { List } from '../../models/list';
import { ModalController, ToastController } from '@ionic/angular';
import { CreateListComponent } from '../components/create-list/create-list.component';
import {Router} from '@angular/router';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  lists: List[];
  userEmail: string;


  constructor(
              private modalController: ModalController,
              private authService: AuthService, private alertController: AlertController,
              private firestoreService: FirestoreService, private router: Router,
              private toastController : ToastController
              ) {
  }

  ngOnInit(): void {}

  ionViewWillEnter(): void {
    if (this.authService.isLoggedIn) {
      this.userEmail = this.authService.getCurrentUser().email;
       this.firestoreService.getLists(this.authService.getCurrentUser()).subscribe( (lists) => {
        this.lists = lists;
       })
    }
    else {
      this.router.navigate(['login']);
    }
  }

  /**
   * Showing the modal to create a new list
   *  
   */
  async showNewListModal() {
    const modal = await this.modalController.create({
      component: CreateListComponent
    });
    return await modal.present();
  }


  /**
   * Deleting a list. Only the creator of the list can delete a list
   * @param id 
   * @param name 
   */
  async delete(id: string, name: string) {
    const user = this.authService.getCurrentUser();
    console.log("Delete from user : " + user.email);

    const alert = await this.alertController.create({
      message: `Delete todo list "${name}" ?`,
      buttons: [
        {
          text: 'Cancel', role: 'cancel', handler: () => {}
        },
        {
          text: 'Confirm',
          role: 'confirm',
          handler: () => { this.firestoreService.deleteList(id).then(() => {
              this.openToast("List deleted");
              for (var i = this.lists.length - 1; i >= 0; i--) {
                if(this.lists[i].id == id){
                  this.lists.splice(i,1);
                }
              }

              //this.reloadLists();
            }, (err : any) => {
              console.log("Error while deleting list : " + err);
            }
          ); }
        }
      ]
    });
    await alert.present();
  }





  reloadLists(){
    this.lists = undefined;
    if (this.authService.isLoggedIn) {
      this.userEmail = this.authService.getCurrentUser().email;
      this.firestoreService.getLists(this.authService.getCurrentUser()).subscribe( (lists) => {
        this.lists = lists;
       })
    }
    else {
      this.router.navigate(['login']);
    }
  }

  async openToast(msg : string) {
    const toast = await this.toastController.create({
      message: msg,
      animated: true,
      duration: 2000,
      position: 'bottom',
      translucent: true,
      color: "success"
    });
    await toast.present();
    toast.onDidDismiss().then((val) => {
      
    });
  }


  signOut() {
    this.authService.doSignOut().then(() => {
      this.router.navigate(['']); });
  }

  
}
