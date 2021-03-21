import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs/internal/Observable';
import { List } from '../../../models/list';
import User from '../../../../node_modules/firebase';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private afs: AngularFirestore) { }

  public createList(name: string, creator: string): Promise<void> {
    const id = this.afs.createId();
    return this.afs.doc(`lists/${id}`).set({id, name, creator});
  }


  public getLists(user: User.User): Observable<any[]> {
    console.log('Getting lists');
    return this.afs.collection<any>('lists', ref => ref.where('creator', '==', user.email)).valueChanges();
  }

  public deleteList(id: string): Promise<void> {
    return this.afs.doc(`lists/${id}`).delete();
  }
}
