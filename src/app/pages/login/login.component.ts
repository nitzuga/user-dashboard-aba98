import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loading: boolean;
  email: string;
  password: string;

  constructor(
    private auth: AuthService,
    private router: Router,
  ) {
    this.loading = false;
  }

  ngOnInit(): void {
  }

  login() {
    this.loading = true;
    this.auth.login(this.email, this.password)
      .then((session) => {
        if ( session && session.user.uid) {
          return this.router.navigateByUrl('/home');
        } else {
          return Promise.reject(false);
        }
      })
      .finally(() => {
        this.loading = false;
        console.log('login finish');
      })
      .catch((err) => {
        console.error(err);
      });
  } // end func login

}
