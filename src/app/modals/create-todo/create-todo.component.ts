import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Tab1Service } from 'src/app/tab1/tab1.service';

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.scss'],
})
export class CreateTodoComponent implements OnInit {

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
