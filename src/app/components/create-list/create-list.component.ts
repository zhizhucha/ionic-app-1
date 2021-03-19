import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { FirestoreService } from '../../services/data/firestore.service';
import { AuthService } from '../../services/user/auth.service';
import User from '../../../../node_modules/firebase';

@Component({
  selector: 'app-create-list',
  templateUrl: './create-list.component.html',
  styleUrls: ['./create-list.component.scss'],
})
export class CreateListComponent implements OnInit {

  user: User.User;
  public listForm : FormGroup;
  listName: FormControl;
  isSubmitted = false;
  
  validation_messages = {
    'name': [
        { type: 'required', message: 'Username is required.' },
        { type: 'minlength', message: 'Username must be at least 5 characters long.' },
        { type: 'maxlength', message: 'Username cannot be more than 25 characters long.' },
        { type: 'pattern', message: 'Your username must contain only numbers and letters.' },
        { type: 'validUsername', message: 'Your username has already been taken.' }
      ],

    }
  

  constructor(private fb: FormBuilder,
              public modalController: ModalController,
              private authService: AuthService,
              private firestoreService: FirestoreService) { 

      this.listName = new FormControl("Default LIstName", [ Validators.required]);
      this.listForm = new FormGroup({
        listName: this.listName
      });
  
  }

  ngOnInit() {
    
    
    this.user = this.authService.getCurrentUser();
  }

  get errorControl() {
    return this.listForm.controls;
  }

  onSubmit() {
    console.log("Creating list : " + this.listForm.get("listName").value + ", " +  this.user.email)

    this.firestoreService.createList(this.listForm.get("listName").value, this.user.email).then(

      () => {
        console.log("Creating----> " );
        
        this.modalController.dismiss(
          {dismiss: true}
        );

      }

     
    );
    }

    submitForm() {
      this.isSubmitted = true;
      console.log(JSON.stringify(this.listForm.value));
      console.log("TEST::: " + this.listForm.value);
      if (!this.listForm.valid) {
        console.log('Please provide all the required values!')
        //return false;
      } else {
        
        this.firestoreService.createList(this.listForm.get("listName").value, this.user.email).then(

          () => {
            console.log("Creating----> " );
            
            this.modalController.dismiss(
              {dismiss: true}
            );
    
          }
    
         
        );
      }
    }


    


}
