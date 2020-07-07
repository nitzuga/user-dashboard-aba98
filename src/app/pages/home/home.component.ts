import { PersonService } from './../../services/person/person.service';
import { Person } from './../../model/person.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  persons: Array<Person>;
  loading: boolean; // for ghost div

  constructor(
    private personService: PersonService,
    private router: Router
  ) {
    // init empty
    this.persons = [];
  } // end constructor

  ngOnInit(): void {
    this.personService.list()
      .subscribe((persons: Array<Person>) => {
        if ( persons ) {
          console.log(persons);
          this.persons = persons;
        }
      }, (err) => {
        console.error(err);
      });
  } // init

  newPerson() {
      this.personService.person = this.personService.default();
      this.router.navigateByUrl('/person/new')
        .catch((err) => console.error(err));
  } // end func newPerson

  deletePerson(person: Person) {
    this.personService.delete(person.rut);
  } // end func delete Person

  edit(person: Person) {
    this.personService.person = person;
    this.router.navigateByUrl('/person/' + person.rut)
      .catch((err) => console.error(err));
  } // end func edit
}
