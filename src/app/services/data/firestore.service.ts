import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import User from '../../../../node_modules/firebase';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  constructor(private afs: AngularFirestore) { }

  public createList(name: string, creator: string): void {
    const listId = this.afs.createId();
    this.afs.doc(`lists/${listId}`).set({name, creator});
  }

  public getLists(user: User.User): Observable<any[]> {
    console.log(user.email);
    return this.afs.collection<any>('lists', ref => ref.where('creator', '==', user.email)).valueChanges();
  }
}
