import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/user/auth.service';

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

  constructor(private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit() {
  }

  onRegister(): void {
    const credentials = {
      email: this.regForm.get('email').value,
      password: this.regForm.get('password').value
    };
    this.authService.doRegister(credentials);
  }

}
