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

  async doLogin(value: any) {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.signInWithEmailAndPassword(value.email, value.password)
          .then(
              res => {
                this.setCurrentUser(res.user);
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

  getCurrentUser(): User.User{
    if (this.user === undefined)
    {
        this.user = JSON.parse(localStorage.getItem('user'));

    }
    return this.user;
  }

  get isLoggedIn(): boolean {
    let localUser = null;
    if (localStorage.getItem('user') !== null)
    {
      localUser = JSON.parse(localStorage.getItem('user'));
    }
    return localUser !== null ||  (this.user !== undefined && this.user !== null);
  }

  async signInWithGoogle(): Promise<any> {
    let googleUser = await Plugins.GoogleAuth.signIn() as any;
    const credential = firebase.auth.GoogleAuthProvider.credential(googleUser.authentication.idToken);
    await this.afAuth.signInWithCredential(credential).then(
      (res : any) => {
        console.log("User : " + JSON.stringify(res));
        console.log("User2 : " + res.user);
        this.setCurrentUser(res.user);
      }, (err : any) => {

      }
    )
  }

  setCurrentUser(currentUser: User.User) {
    this.user = currentUser;
    localStorage.setItem('user', JSON.stringify(this.user));
  }

  async doSignOut(): Promise<any> {
    return new Promise<any>(() => {
      this.user = undefined;
      this.afAuth.signOut();
    });

  }
}
