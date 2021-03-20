import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/user/auth.service';
import {ToastController} from '@ionic/angular';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  regForm = this.fb.group({
    email: ['', Validators.minLength(3)],
    password: ['', Validators.minLength(3)]
  });

  constructor(private fb: FormBuilder, private authService: AuthService,
              private toastControl: ToastController, private route: Router) { }

  ngOnInit() {
  }

  async onRegister(): Promise<void> {
    try {
      const credentials = {
        email: this.regForm.get('email').value,
        password: this.regForm.get('password').value
      };
      await this.authService.doRegister(credentials);

      const toastSuccess = await this.toastControl.create({
        color: 'success', duration: 10000,
        message: `Registration done. Confirmation link sent to ${credentials.email}`
      });
      await toastSuccess.present();

      await this.route.navigate(['login']);
    }
    catch (e) {
      const toastException = await this.toastControl.create({
          color: 'danger', duration: 10000, message: e.message
        });
      await toastException.present();
    }
  }

}
