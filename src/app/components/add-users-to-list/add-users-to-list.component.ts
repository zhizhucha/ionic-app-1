import { Component, OnInit } from '@angular/core';
import {FirebaseAdminService} from '../../services/admin/firebase-admin.service';

@Component({
  selector: 'app-add-users-to-list',
  templateUrl: './add-users-to-list.component.html',
  styleUrls: ['./add-users-to-list.component.scss'],
})
export class AddUsersToListComponent implements OnInit {
  addUsersFormGroup = [
    {val: 'Gaia'}, {val: 'Hermes'}, {val: 'Odin'}
  ];

  constructor(private firebaseAdmin: FirebaseAdminService) { }

  ngOnInit() {
    console.log(this.firebaseAdmin.getUsers());
  }

  addUsers() {

  }

  backToLists() {

  }
}
