import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';

/**
 * @description
 * Database wrapper for set, update & delete. The main purpose is to provide a service wrapper
 * that is easier to update if the database or framework used needs to be changed.
 */
@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(
    private fb: AngularFirestore
  ) {}

  set(collection, id, data) {
    data.createdAt = firebase.firestore.FieldValue.serverTimestamp();
    data.updatedAt = firebase.firestore.FieldValue.serverTimestamp();
    return this.fb.collection(collection).doc(id).set(data);
  } // end func set

  update(collection, id, data) {
    data.updatedAt = firebase.firestore.FieldValue.serverTimestamp();
    return this.fb.collection(collection).doc(id).set(data);
  } // end func update

  delete(collection, id) {
    return this.fb.collection(collection).doc(id).delete();
  } // end func delete
}
