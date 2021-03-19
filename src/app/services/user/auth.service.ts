import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import User from '../../../../node_modules/firebase';
import '@codetrix-studio/capacitor-google-auth';
import { Router } from '@angular/router';
import firebase from 'firebase';
import { Plugins } from '@capacitor/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User.User;


  constructor(public afAuth: AngularFireAuth, public router: Router) { 
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
                console.log(this.afAuth.authState);
                this.router.navigate(['/home']);
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
          );
    });
  }

  async sendEmailVerification(){
    (await this.afAuth.currentUser).sendEmailVerification();

  }

  async sendPasswordResetEmail( mEmail: string) {
    return await this.afAuth.sendPasswordResetEmail(mEmail);
  }

  getCurrentUser() : User.User{
    if(this.user === undefined)
    {
        this.user = JSON.parse(localStorage.getItem('user'));

    }
    return this.user;
  }

  get isLoggedIn(): boolean {
    //const user = JSON.parse(localStorage.getItem('user'));
    if(localStorage.getItem('user') != null)
    {
      if(this.user === undefined)
      {
          this.user = JSON.parse(localStorage.getItem('user'));

      }
    }
    console.log("user = " + this.user);
    console.log("user = " + localStorage.getItem('user'));
    return this.user !== null && this.user !== undefined;
  }

  async signInWithGoogle(): Promise<any> {
    let googleUser = await Plugins.GoogleAuth.signIn() as any;
    const credential = firebase.auth.GoogleAuthProvider.credential(googleUser.authentication.idToken);
    await this.afAuth.signInWithCredential(credential);
   
    
  }
}
