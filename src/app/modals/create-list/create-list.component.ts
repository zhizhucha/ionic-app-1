import { Component, OnInit } from '@angular/core';
import {Tab1Service} from '../../tab1/tab1.service';
import {ModalController} from '@ionic/angular';
import {FormBuilder, Validators} from '@angular/forms';
import { FirestoreService } from '../../services/data/firestore.service';
import { AuthService } from '../../services/auth.service';
import User from '../../../../node_modules/firebase';

@Component({
  selector: 'app-create-list',
  templateUrl: './create-list.component.html',
  styleUrls: ['./create-list.component.scss'],
})
export class CreateListComponent implements OnInit {
  user: User.User;
  newListForm = this.fb.group({
    name: ['', Validators.minLength(3)]
  });

  constructor(private fb: FormBuilder,
              public modalController: ModalController,
              private listService: Tab1Service,
              private authService: AuthService,
              private firestoreService: FirestoreService) { }

  ngOnInit() {
    this.user = this.authService.user;
  }

  onSubmit() {
    // this.listService.saveList(this.newListForm.get('name').value);
    this.firestoreService.createList(this.newListForm.get('name').value, this.user.email);
    this.modalController.dismiss(
        {dismiss: true}
    );

  }
}
