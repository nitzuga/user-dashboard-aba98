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

  deletePerson(person: Person) {
    this.personService.delete(person.rut);
  } // end func delete Person

  edit(person: Person) {
    this.router.navigateByUrl('/person');
  } // end func edit
}
