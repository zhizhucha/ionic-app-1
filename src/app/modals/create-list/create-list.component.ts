import { Component, OnInit } from '@angular/core';
import {Tab1Service} from '../../tab1/tab1.service';
import {ModalController} from '@ionic/angular';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-create-list',
  templateUrl: './create-list.component.html',
  styleUrls: ['./create-list.component.scss'],
})
export class CreateListComponent implements OnInit {
  newListForm = this.fb.group({
    name: ['', Validators.minLength(3)]
  });

  constructor(private fb: FormBuilder,
              public modalController: ModalController,
              private listService: Tab1Service) { }

  ngOnInit() {}

  onSubmit() {
    this.listService.saveList(this.newListForm.get('name').value);
    this.modalController.dismiss({
      dismiss: true
    });
  }
}
