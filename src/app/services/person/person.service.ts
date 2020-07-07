import { Injectable } from '@angular/core';

// model
import { Person } from 'src/app/model/person.model';

// services
import { DatabaseService } from './../database/database.service';
import { ValidatorService } from './../validator/validator.service';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private readonly COLLECTION_ID = 'persons';
  constructor(
    private db: DatabaseService,
    private validator: ValidatorService
  ) {}

  /**
   * @description
   * Delete Person object with specified id.
   * @param id String with rut of the person.
   */
  delete(id) {
    return this.db.delete(this.COLLECTION_ID, id);
  } // end func delete

  /**
   * @description
   * Validates data and format of values in object Person.
   */
  isPerson( person: Person ) {
    // validate required fields
    if ( !this.validator.isName(person.name) ) {
      return false;
    }

    if ( !this.validator.isLastName(person.lastname) ) {
      return false;
    }

    // check for not required fields
    if ( person.age ) {
      // validate age
      if ( !this.validator.isAge(person.age) ) {
        // address out of format or too young
        return false;
      }
    }

    // check address is set
    if ( person.address ) {
      // validate address
      if ( !this.validator.isAddress(person.address) ) {
        // address out of format
        return false;
      }
    }
    return true;
  } // end func isPerson

  list() {
    return this.db.list(this.COLLECTION_ID);
  } // end func list

  /**
   * @description
   * Saves Person data to the database. Creates a new one if does not exists.
   * @param id database id for this person. Use same as rut as is unique.
   * @param data object with person data.
   */
  set(id, data) {
    if ( !this.isPerson(data) ) {
      return Promise.reject(false);
    }
    return this.db.set(this.COLLECTION_ID, id, data)
      .then(() => {
        return Promise.resolve(true);
      }, (reason) => {
        console.error(reason);
        return Promise.reject(false);
      });
  } // end func set

  /**
   * @description
   * Provides an Observable with data of the Person with specified id.
   * @param id Rut of the person. Unique in DB.
   */
  watch(id) {
    return this.db.watch(this.COLLECTION_ID, id);
  } // end func watch
}
