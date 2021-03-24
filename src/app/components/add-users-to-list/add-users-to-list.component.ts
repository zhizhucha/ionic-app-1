import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {FirestoreService} from '../../services/data/firestore.service';
import {AlertController, ModalController, ToastController} from '@ionic/angular';

@Component({
  selector: 'app-add-users-to-list',
  templateUrl: './add-users-to-list.component.html',
  styleUrls: ['./add-users-to-list.component.scss'],
})
export class AddUsersToListComponent implements OnInit {
  

  @Input() listId : string;
  @Input() canReadArray : string[];

  addUsersFormGroup: FormGroup;
  user1Email: FormControl;
  user2Email: FormControl;
  user3Email: FormControl;
  formIsValid: boolean;
  //listId: string;

  constructor(private fb: FormBuilder, private router: Router, private alertController: AlertController, public modalController: ModalController,
              private firestoreService: FirestoreService, private activatedRoute: ActivatedRoute, private toastControl: ToastController) { }

  ngOnInit() {
    //this.listId = this.activatedRoute.snapshot.params.listId;
    console.log("CanRead : " + JSON.stringify(this.canReadArray));
    if(this.canReadArray !== undefined){
      this.user1Email = new FormControl(this.canReadArray[0], [Validators.email, Validators.required]);
      this.user2Email = new FormControl(this.canReadArray[1], [Validators.email]);
      this.user3Email = new FormControl(this.canReadArray[2], [Validators.email]);
    }else{
      this.user1Email = new FormControl('', [Validators.email, Validators.required]);
      this.user2Email = new FormControl('', [Validators.email]);
      this.user3Email = new FormControl('', [Validators.email]);
    }
   
    this.addUsersFormGroup = new FormGroup({
      user1Email: this.user1Email, user2Email: this.user2Email, user3Email: this.user3Email
    });
    this.formIsValid = false;
  }

  async addUsers() {
    this.formIsValid = this.validateAddUsersFormGroup();
    if (this.formIsValid) {
      const users = [
        this.addUsersFormGroup.get('user1Email').value,
        this.addUsersFormGroup.get('user2Email').value,
        this.addUsersFormGroup.get('user3Email').value
      ];
      this.firestoreService.addUsersToList(this.listId, users).then(async () => {
        const toastSuccess = await this.toastControl.create({
          color: 'success', duration: 5000,
          message: `Users granted read access to the list`
        });
        await toastSuccess.present();
        this.modalController.dismiss(
          {dismiss: true}
        );
        //this.backToHome();
      });
    }
    else {
      const alert = await this.alertController.create({
        message: 'Verify the order of the emails entered before adding the user(s).',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  /**
   * Validates the form for adding users to a list
   * The 1st user's email is entered and all form controls are validated (by angular) before this validation function is called
   * Returns false if the 3rd user's email is entered and the 2nd is left empty
   * Returns true otherwise
   */
  validateAddUsersFormGroup(): boolean {
    const user2 = this.addUsersFormGroup.get('user2Email').value;
    const user3 = this.addUsersFormGroup.get('user3Email').value;
    if (user2 !== '' && user3 !== '') { return true; }
    if (user2 === '' && user3 === '') { return true; }
    return user2 !== '' && user3 === '';
  }

  backToHome() {
    this.router.navigate(['home']);
  }
}
