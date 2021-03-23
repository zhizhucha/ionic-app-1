import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-users-to-list',
  templateUrl: './add-users-to-list.component.html',
  styleUrls: ['./add-users-to-list.component.scss'],
})
export class AddUsersToListComponent implements OnInit {
  addUsersFormGroup: FormGroup;
  user1Email: FormControl;
  user2Email: FormControl;
  user3Email: FormControl;

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.user1Email = new FormControl('', [Validators.email, Validators.required]);
    this.user2Email = new FormControl('', [Validators.email]);
    this.user3Email = new FormControl('', [Validators.email]);
    this.addUsersFormGroup = new FormGroup({
      user1Email: this.user1Email, user2Email: this.user2Email, user3Email: this.user3Email
    });
  }

  addUsers() {
    console.log('add')
  }

  backToHome() {
    this.router.navigate(['home']);
  }
}
