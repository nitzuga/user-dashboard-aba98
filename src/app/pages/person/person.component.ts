import { Person } from './../../model/person.model';
import { PersonService } from './../../services/person/person.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {
  person: Person;
  constructor(
    private personService: PersonService
  ) { }

  ngOnInit(): void {
    this.person = this.personService.person;
  }

}
