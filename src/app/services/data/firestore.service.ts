import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs/internal/Observable';
import { List } from '../../../models/list';
import User from '../../../../node_modules/firebase';
import { Todo } from '../../../models/todo';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private afs: AngularFirestore) { }

  /**
   * Creates a new list document in firestore
   * @param name the name of the list
   * @param creator the email of the creator
   */
  public createList(name: string, creator: string): Promise<void> {
    const listId = this.afs.createId();
    return this.afs.doc(`lists/${listId}`).set({name, creator});
  }

  /**
   * Gets the lists of an authenticated user from firestore
   * @param user the authenticated user
   */
  public getLists(user: User.User): Observable<any[]> {
    console.log('Getting lists');
    return this.afs.collection<any>('lists', ref => ref.where('creator', '==', user.email)).valueChanges( {idField: 'id'});
  }

  /**
   * Recuperation des todo associés à une liste
   */
  public getTodoList(user : User.User, listId : string): Observable<any>{
    console.log(" myListId : " + listId);
    return  this.afs.collection<any>(`lists/${listId}/todos`, ref => ref.orderBy('dueDate', 'asc') ).valueChanges( {idField: 'id' });
  }

  /**
   * Creating a todo inside a list
   */
  public createTodo(listId : string, name : string, description : string, dueDate : Date): Promise<void>{
    const todoId = this.afs.createId();
    const isDone = false;
    console.log("Stored : " + dueDate.toJSON + " in listId " + listId + " and todo " + todoId);
    return this.afs.doc(`lists/${listId}/todos/${todoId}`).set({name, description, isDone, dueDate});
  }
 public deleteList(id: string): Promise<void> {
    return this.afs.doc(`lists/${id}`).delete();
  }
  /**
   * Deleting a Todo inside a list
   * @param listId
   * @param todoId
   * @returns
   */
  public deleteTodo(listId: string, todoId : string) : Promise<void> {
    const todoDoc = this.afs.doc<Todo>(`lists/${listId}/todos/${todoId}`);
    return todoDoc.delete();
  }

  /**
   * Grants between 1 and 3 users read access to a list by adding them to the canRead field of the list document
   * @param listId the list document
   * @param users the users that have read access to the list
   */
  public addUsersToList(listId: string, users: any): Promise<void> {
    const user3 = users[2].user;
    if (user3 !== '') {
      const user3Id = this.afs.createId();
      this.afs.doc(`lists/${listId}/canRead/${user3Id}`).set({user3});
    }

    const user2 = users[1].user;
    if (user2 !== '') {
      const user2Id = this.afs.createId();
      this.afs.doc(`lists/${listId}/canRead/${user2Id}`).set({user2});
    }

    const user1 = users[0].user;
    const user1Id = this.afs.createId();
    return this.afs.doc(`lists/${listId}/canRead/${user1Id}`).set({user1});
  }

}
