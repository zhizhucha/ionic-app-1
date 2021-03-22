import { Component, OnInit } from '@angular/core';
import {FirestoreService} from '../../services/data/firestore.service';

@Component({
  selector: 'app-add-users-to-list',
  templateUrl: './add-users-to-list.component.html',
  styleUrls: ['./add-users-to-list.component.scss'],
})
export class AddUsersToListComponent implements OnInit {
  addUsersFormGroup = [
    {val: 'Gaia'}, {val: 'Hermes'}, {val: 'Odin'}
  ];

  constructor(private firestore: FirestoreService) { }

  ngOnInit() {}

  addUsers() {

  }

  backToLists() {

  }
}
