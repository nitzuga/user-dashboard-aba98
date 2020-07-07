import { MatSnackBar } from '@angular/material/snack-bar';
import { ValidatorService } from './../../services/validator/validator.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

// services
import { Person } from './../../model/person.model';
import { PersonService } from './../../services/person/person.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {
  person: Person;
  loading: boolean;
  label: string;
  invalid = {
    rut: false,
    name: false,
    lastname: false,
    age: false,
    address: false
  };

  errors = [];

  constructor(
    private personService: PersonService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.label = 'Create';
  }

  ngOnInit(): void {
    if ( !this.personService.person ) {
      this.personService.person = this.personService.default();
    }
    this.person = this.personService.person;

    if ( this.person.rut === '' ) {
      this.label = 'Create';
    } else {
      this.label = 'Edit';
    }
  }

  save() {
    this.loading = true;
    console.log(this.person);
    this.errors = this.personService.isPerson(this.person);
    if ( this.errors.length === 0 ) {
      for (const key in this.invalid) {
        if (this.invalid.hasOwnProperty(key)) {
          this.invalid[key] = false;
        }
      }
      this.personService.set(this.person.rut, this.person)
        .then(() => {
          return this.router.navigateByUrl('/home');
        })
        .then(() => this.snackBar.open('Creation process was succesfull!', 'Great!', {duration: 5000}))
        .finally(() => {
          this.loading = false;
        });
    } else {
      this.loading = false;
      console.error('not valid format');

      this.snackBar.open('Theres is an error in your form.', 'Oops!', {});

      console.log(this.errors);
      this.errors.forEach((err) => {
        if ( this.invalid.hasOwnProperty(err) ) {
          this.invalid[err] = true;
        }

        if ( this.person.hasOwnProperty(err) ) {
          if ( err === 'age' ) {
            this.person[err] = 19;
          } else {
            this.person[err] = '';
          }
        }
      });

      console.log(this.invalid);
    }
  } // end func save
}
