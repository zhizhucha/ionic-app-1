import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FirestoreService } from '../../services/data/firestore.service';
import { AuthService } from '../../services/user/auth.service';
import User from '../../../../node_modules/firebase';
import { ModalController } from '@ionic/angular';
import { Input } from '@angular/core';


@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.scss'],
})
export class CreateTodoComponent implements OnInit {
  user: User.User;
  @Input() listId : string;

  public todoForm : FormGroup;
  todoName: FormControl;
  todoDescription: FormControl;
  dueDate: FormControl;
  minDate : string;
  maxDate : string;

  isSubmitted = false;

  constructor(private fb: FormBuilder,
      public modalController: ModalController,
      private authService: AuthService,
      private firestoreService: FirestoreService) { 

    this.todoName = new FormControl('', [ Validators.required]);
    this.todoDescription = new FormControl('', [ Validators.required]);
    this.dueDate = new FormControl( (new Date()).toJSON());

    this.minDate = (new Date()).toJSON();
    console.log("MinDate : " + this.minDate);
    console.log("MaxDate : " + this.minDate);
    const curDate = new Date();
    //Max date is current year + 2
    curDate.setFullYear(curDate.getFullYear() + 2);
    this.maxDate = (curDate).toJSON();

    this.todoForm = new FormGroup({
      todoName: this.todoName,
      todoDescription: this.todoDescription,
      dueDate: this.dueDate
    });

  }


  ngOnInit() {
    this.user = this.authService.getCurrentUser();
  }




  submitForm() {
    this.isSubmitted = true;
    console.log(JSON.stringify(this.todoForm.value));
    console.log("TEST::: " + this.todoForm.value);
    if (!this.todoForm.valid) {
      console.log('Please provide all the required values!')
      //return false;
    }else if(this.listId === undefined){
      console.log('List Id not provided');
    } else {
      console.log(" The list ID when creating todo : " + this.listId);
      console.log("This date for the task : " + this.todoForm.get("dueDate").value);
      this.firestoreService.createTodo(this.listId, this.todoForm.get("todoName").value, 
                                      this.todoForm.get("todoDescription").value,
                                      this.todoForm.get("dueDate").value
                                      ).then(

        () => {
          console.log("Did it really succesed?");
          this.modalController.dismiss(
            {dismiss: true}
          );
  
        },
        (err) =>{
          console.log(" Error  ; " + err);
        }
  
       
      );
    }
  }

}
