import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// firebase
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

  get(id: string) {
    return this.fb.doc(id).ref.get();
  } // end func get

  list(collection: string) {
    return this.fb.collection(collection).valueChanges();
  } // end func list

  set(collection: string, id: string, data: any): Promise<void> {
    data.createdAt = firebase.firestore.FieldValue.serverTimestamp();
    data.updatedAt = firebase.firestore.FieldValue.serverTimestamp();
    return this.fb.collection(collection).doc(id).set(data);
  } // end func set

  update(collection: string, id: string, data: any): Promise<void> {
    data.updatedAt = firebase.firestore.FieldValue.serverTimestamp();
    return this.fb.collection(collection).doc(id).set(data);
  } // end func update

  watch(collection, id): Observable<any>  {
    return this.fb.collection(collection).doc(id).valueChanges();
  } // end func watch

  delete(collection: string, id: string): Promise<void> {
    return this.fb.collection(collection).doc(id).delete();
  } // end func delete
}
