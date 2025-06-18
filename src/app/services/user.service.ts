import { Injectable } from '@angular/core';
import { login, signUp } from '../data-type';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  invalidUserAuth = new EventEmitter<boolean>(false);
  constructor(private http: HttpClient, private router: Router) {}

  userSignIn(user: signUp): void {
    this.http
      .post('http://localhost:3000/users', user, { observe: 'response' })
      .subscribe({
        next: (res) => {
          if (res && res.body) {
            localStorage.setItem('user', JSON.stringify(res.body));
            this.router.navigate(['/']);
          }
        },
        error: (err) => {
          console.error('User sign-in failed:', err);
        },
      });
  }

  userAuthReload() {
    if (localStorage.getItem('user')) {
      this.router.navigate(['/']);
    }
  }

  userLogin(data: login): void {
    this.http
      .get<signUp[]>(
        `http://localhost:3000/users?email=${data.email}&password=${data.password}`,
        { observe: 'response' }
      )
      .subscribe((res) => {
        if (res && res.body?.length) {
          localStorage.setItem('user', JSON.stringify(res.body[0]));
          this.router.navigate(['/']);
          this.invalidUserAuth.emit(false);
        } else {
          this.invalidUserAuth.emit(true);
          // alert('Invalid credentials');
        }
      });
  }
}
