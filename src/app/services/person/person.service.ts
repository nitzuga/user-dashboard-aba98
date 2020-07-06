import { Injectable } from '@angular/core';
import { Person } from 'src/app/model/person.model';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor() {}

  isPerson( person: Person ) {
    return true;
  } // end func isPerson

}
