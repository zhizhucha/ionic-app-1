import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {List} from '../../../models/list';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private afs: AngularFirestore) { }

  public createList(listName: string, listOwner: string): void {
    const listId = this.afs.createId();
    this.afs.doc(`lists/${listId}`).set({listName, listOwner});
  }

  public getLists(): Observable<List[]> {
    return this.afs.collection<List>('lists').valueChanges();
  }
}
