import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SellerService } from '../services/seller.service';
import { login, signUp } from '../data-type';
import { isError } from 'node:util';

@Component({
  selector: 'app-seller-auth',
  imports: [FormsModule],
  templateUrl: './seller-auth.component.html',
  styleUrl: './seller-auth.component.css',
})
export class SellerAuthComponent {
  showLogin = false;
  authError: string = '';
  // errmsg: string = '';

  constructor(private seller: SellerService) {}

  ngOnInit(): void {
    this.seller.reloadSeller();
  }

  signUp(data: signUp): void {
    // console.log(data);
    // this.seller.userSignUp(data).subscribe((res) => {
    //   if (res) {
    //     this.router.navigate(['/seller-home']);
    //   } else {
    //     alert('Error');
    //   }
    // });
    this.seller.userSignUp(data);
  }

  login(data: login): void {
    // console.log(data);
    this.seller.userLogin(data);
    this.seller.isLoginError.subscribe((isError) => {
      if (isError) {
        this.authError = 'Email or Password is incorrect';
        // alert('Error');
      }
      // this.errmsg = 'XXX';
    });
  }

  openLogin() {
    this.showLogin = !this.showLogin;
  }
}
