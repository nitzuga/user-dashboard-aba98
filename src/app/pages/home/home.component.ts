import { PersonService } from './../../services/person/person.service';
import { Person } from './../../model/person.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  persons: Array<Person>;
  loading: boolean; // for ghost div

  private sub: Subscription;

  constructor(
    private personService: PersonService,
    private router: Router
  ) {
    // init empty
    this.persons = [];
  } // end constructor

  ngOnInit(): void {
    console.log('init');
    if ( !this.sub ) {
      this.loading = true;
      this.sub = this.personService.list()
        .subscribe((persons: Array<Person>) => {
          this.loading = false;
          console.log('reads');
          if ( persons ) {
            console.log(persons);
            this.persons = persons;
          }
        }, (err) => {
          console.error(err);
        }, () => this.loading = false);
    } else {
      // debug
    }
  } // init

  newPerson() {
      this.personService.person = this.personService.default();
      this.router.navigateByUrl('/person/new')
        .catch((err) => console.error(err));
  } // end func newPerson

  deletePerson( person: Person) {
    this.loading = true;
    this.personService.delete(person.rut)
      .then(() => {
        console.log('person deleted');
      })
      .finally(() => this.loading = false)
      .catch((err) => console.error(err));
  } // end func delete Person

  edit(person: Person) {
    this.personService.person = person;
    this.router.navigateByUrl('/person/' + person.rut)
      .catch((err) => console.error(err));
  } // end func edit

  OnDestroy() {
    console.log('destroy');
    if ( this.sub ) {
      this.sub.unsubscribe();
    }
  }
}
