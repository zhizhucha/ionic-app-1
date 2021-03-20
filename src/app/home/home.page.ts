import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { AuthService } from '../services/user/auth.service';
import {FirestoreService} from '../services/data/firestore.service';
import { List } from '../../models/list';
import { ModalController } from '@ionic/angular';
import { CreateListComponent } from '../components/create-list/create-list.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  lists: List[];

  constructor(
              private modalController: ModalController,
              private authService: AuthService,
              private firestoreService: FirestoreService
              ) {
  }

  ngOnInit(): void {
    const loginState = this.authService.isLoggedIn;
    // console.log('Is logged ? : ' + loginState);
    console.log(this.authService.getCurrentUser());

    this.firestoreService.getLists(this.authService.user).subscribe( (data: List[]) => {
      console.log('Retrieved : ' + JSON.stringify(data));
      this.lists = data;
    });
  }

  async showNewListModal() {
    const modal = await this.modalController.create({
      component: CreateListComponent
    });
    return await modal.present();
  }

}
