import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../../services/user/auth.service';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.page.html',
  styleUrls: ['./recovery.page.scss'],
})
export class RecoveryPage implements OnInit {

  recoveryForm = this.fb.group({
    email: ['', Validators.minLength(3)]
  });

  constructor(private fb: FormBuilder,private toastControl: ToastController,  private authService: AuthService, private router : Router) { }

  ngOnInit() {
  }

  onRecover(): void {
    const mEmail : string = this.recoveryForm.get('email').value;

    this.authService.sendPasswordResetEmail(mEmail).then((res) =>{
      //console.log("Recovery email sent");
      this.openToast("A recovery mail has been sent to email", true);
      this.router.navigate(['/login']);
    })
    .catch( (error) => {
      //console.log("ERROR : " + error);
      this.openToast(error, false);
    });
  }




  async openToast(msg : string, state : boolean) {
    const toast = await this.toastControl.create({
      message: msg,
      animated: true,
      duration: 2000,
      position: 'bottom',
      translucent: true,
      color: state?"success":"danger"
    });
    await toast.present();
    toast.onDidDismiss().then((val) => {
      console.log('Toast Dismissed');
    });
  }

}
