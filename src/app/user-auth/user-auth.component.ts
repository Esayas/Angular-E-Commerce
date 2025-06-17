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
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.userAuthReload();
  }

  signUp(data: signUp) {
    this.userService.userSignIn(data);
  }
}
