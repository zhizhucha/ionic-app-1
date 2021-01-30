import {Component, OnDestroy, OnInit} from '@angular/core';
import { Tab1Service } from './tab1.service';
import { List } from '../../models/list';
import {ModalController} from '@ionic/angular';
import {CreateListComponent} from '../modals/create-list/create-list.component';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  lists: List[];

  constructor(private listService: Tab1Service,
              private modalController: ModalController) {
  }

  ngOnInit(): void {
    this.lists = this.listService.getMockList();
  }

  async showNewListModal() {
    const modal = await this.modalController.create({
      component: CreateListComponent
    });
    return await modal.present();
  }

}
