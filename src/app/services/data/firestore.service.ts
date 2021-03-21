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
    return this.afs.collection<any>('lists', ref => ref.where('creator', '==', user.email)).valueChanges( {idField: 'id'});
  }

  /**
   * Recuperation des todo associés à une liste
   */
  public getTodoList(user : User.User, listId : string): Observable<any>{
    console.log(" myListId : " + listId);
    return  this.afs.collection<any>(`lists/${listId}/todos`).valueChanges( {idField: 'id' });
  }

  /**
   * Creating a todo inside a list
   */
  public createTodo(listId : string, name : string, description : string): Promise<void>{
    const todoId = this.afs.createId(); 
    const isDone = false;
    return this.afs.doc(`lists/${listId}/todos/${todoId}`).set({name, description, isDone});
  }

  public deleteList(id: string): Promise<void> {
    return this.afs.doc(`lists/${id}`).delete();
  }
}
