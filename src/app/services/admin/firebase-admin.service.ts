import { Injectable } from '@angular/core';
// import * as fbAdmin from 'firebase-admin';
import * as fbAdmin from '../../../../node_modules/firebase-admin';
import {auth} from 'firebase-admin/lib/auth';


@Injectable({
  providedIn: 'root'
})
export class FirebaseAdminService {

  constructor() {}

  /**
   * Gets all users from the firestore.
   * The returned users have submitted the registration form
   */
  public getUsers(): Promise<auth.GetUsersResult> {
    return fbAdmin.initializeApp().auth().getUsers([{phoneNumber: ''}]);
  }

}
