import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { signUp } from '../data-type';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-auth',
  imports: [CommonModule, FormsModule],
  templateUrl: './user-auth.component.html',
  styleUrl: './user-auth.component.css',
})
export class UserAuthComponent {
  errMsg: string = '';
  constructor(private userService: UserService) {}
  showLogin: boolean = true;

  ngOnInit(): void {
    this.userService.userAuthReload();
  }

  signUp(data: signUp) {
    this.userService.userSignIn(data);
  }

  login(data: signUp) {
    // this.userService.userSignIn(data);
    this.userService.userLogin(data);
    this.userService.invalidUserAuth.subscribe((res) => {
      if (res) {
        this.errMsg = 'Invalid Credentials';
        return;
      }
      console.log(res);
    });
  }

  openSignUp() {
    this.showLogin = false;
  }
  openLogin() {
    this.showLogin = true;
  }
}
