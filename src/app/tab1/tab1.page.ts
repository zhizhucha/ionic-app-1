import {Component, OnDestroy, OnInit} from '@angular/core';
import { Tab1Service } from './tab1.service';
import { List } from '../../models/list';
import {ModalController} from '@ionic/angular';
import {CreateListComponent} from '../modals/create-list/create-list.component';
import { AuthService } from '../services/auth.service';
import {FirestoreService} from '../services/data/firestore.service';
import {Observable} from 'rxjs';
// import {AngularFirestore} from '@angular/fire/firestore';
// import {AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection} from '@angular/fire/firestore';
// import {Observable} from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  lists: Observable<any>;

  constructor(private tab1Service: Tab1Service,
              private modalController: ModalController,
              private authService: AuthService,
              private firestoreService: FirestoreService
              ) {
  }

  ngOnInit(): void {
    const loginState = this.authService.isLoggedIn;
    // console.log(this.authService.user);
    this.lists = this.firestoreService.getLists(this.authService.user);
  }

  async showNewListModal() {
    const modal = await this.modalController.create({
      component: CreateListComponent
    });
    return await modal.present();
  }



}
