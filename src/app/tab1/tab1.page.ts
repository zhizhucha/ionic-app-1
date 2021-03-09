import {Component, OnDestroy, OnInit} from '@angular/core';
import { Tab1Service } from './tab1.service';
import { List } from '../../models/list';
import {ModalController} from '@ionic/angular';
import {CreateListComponent} from '../modals/create-list/create-list.component';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  lists: List[];

  constructor(private tab1Service: Tab1Service,
              private modalController: ModalController,
              private authService: AuthService
              ) {
  }

  ngOnInit(): void {
    this.lists = this.tab1Service.getMockList();

    const loginState = this.authService.isLoggedIn;
    console.log("Is logged : " + loginState);

  }

  async showNewListModal() {
    const modal = await this.modalController.create({
      component: CreateListComponent
    });
    return await modal.present();
  }



}
