import { Injectable } from '@angular/core';
import { signUp } from '../data-type';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
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
}
