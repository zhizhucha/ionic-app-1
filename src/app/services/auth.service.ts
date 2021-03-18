import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import User from '../../../node_modules/firebase';
import { Router } from '@angular/router';

import '@codetrix-studio/capacitor-google-auth';
import { Plugins } from '@capacitor/core';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: User.User;


  constructor(public afAuth: AngularFireAuth, public router: Router) {
    // Subscribe to the authentification state
    this.afAuth.authState.subscribe(user => {
      if (user){
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        localStorage.setItem('user', null);
      }
    });
  }

  doLogin(value: any) {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.signInWithEmailAndPassword(value.email, value.password)
          .then(
              res => {
                this.router.navigate(['/lists']);
                resolve(res);
              },
              err => reject(err)
          );
    });

  }

  async doRegister(mform: any) {
    console.log(mform);

    return new Promise<any>((resolve, reject) => {
      this.afAuth.createUserWithEmailAndPassword(mform.email, mform.password)
          .then(
              res =>  {
                this.sendEmailVerification();
                resolve(res);
              },
              err => reject(err)
          )
          .finally(
              () => { this.router.navigate(['/lists']); }
          );
    });
  }



  


  async sendEmailVerification(){
    (await this.afAuth.currentUser).sendEmailVerification();

  }

  async sendPasswordResetEmail( mEmail: string) {
    return await this.afAuth.sendPasswordResetEmail(mEmail);
  }

  get isLoggedIn(): boolean {
    //const user = JSON.parse(localStorage.getItem('user'));
    return this.user !== null;
  }

  async signInWithGoogle(): Promise<void> {
    const result = await Plugins.GoogleAuth.signIn();
    console.log('result', result);
  }



}
