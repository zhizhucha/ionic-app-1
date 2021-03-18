import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  constructor(private afs: AngularFirestore) { }

  public createList(name: string, creator: string): void {
    const listId = this.afs.createId();
    this.afs.doc(`lists/${listId}`).set({name, creator});
  }

  public getLists(): Observable<any[]> {
    return this.afs.collection<any>('lists').valueChanges();
  }
}
