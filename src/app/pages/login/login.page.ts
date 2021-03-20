import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/user/auth.service';
import {ToastController} from '@ionic/angular';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm = this.fb.group({
    email: ['', Validators.minLength(3)],
    password: ['', Validators.minLength(3)]
  });

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router,
              private toastControl: ToastController) { }

  ngOnInit() {
  }

  async onLogin(): Promise<void> {
    try {
      const credentials = {
        email: this.loginForm.get('email').value,
        password: this.loginForm.get('password').value
      };
      await this.authService.doLogin(credentials);
      await this.router.navigate(['/home']);
    }
    catch (e) {
      const toastException = await this.toastControl.create({
        color: 'danger', duration: 10000, message: e.message
      });
      await toastException.present();
    }
  }

  //DO not work yet
  onGoogleSignIn(): void {
    this.authService.signInWithGoogle();
  }

}
