import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.page.html',
  styleUrls: ['./password-recovery.page.scss'],
})
export class PasswordRecoveryPage implements OnInit {
  recoveryForm = this.fb.group({
    email: ['', Validators.minLength(3)]
  });

  constructor(private fb: FormBuilder, private authService: AuthService, private router : Router) { }

  ngOnInit() {
  }

  onRecover(): void {
    const mEmail : string = this.recoveryForm.get('email').value;

    this.authService.sendPasswordResetEmail(mEmail).then((res) =>{
      console.log("Recovery email sent");
      this.router.navigate(['/login']);
    })
    .catch( (error) => {
      console.log(error);
    });
  }

}