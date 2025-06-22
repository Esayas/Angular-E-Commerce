import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { cart, product, signUp } from '../data-type';
import { UserService } from '../services/user.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-user-auth',
  imports: [CommonModule, FormsModule],
  templateUrl: './user-auth.component.html',
  styleUrl: './user-auth.component.css',
})
export class UserAuthComponent {
  errMsg: string = '';
  constructor(
    private userService: UserService,
    private productService: ProductService
  ) {}
  showLogin: boolean = true;

  ngOnInit(): void {
    this.userService.userAuthReload();
    localStorage.removeItem('localCart');
    // this.productService.clearCartCount();
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
      this.addFromLocalStorage();
      // console.log(res);
    });
  }

  openSignUp() {
    this.showLogin = false;
  }
  openLogin() {
    this.showLogin = true;
  }

  addFromLocalStorage() {
    const localData = localStorage.getItem('localCart');
    const user = localStorage.getItem('user');
    const userId = user && JSON.parse(user).id;

    if (localData && user) {
      const localDataObj: product[] = JSON.parse(localData);

      localDataObj.forEach((item: product) => {
        const cartData: cart = {
          ...item,
          userId: userId,
          productId: item.id,
        };

        // Remove the local id to avoid conflict with server-side IDs
        delete cartData.id;

        setTimeout(() => {
          this.productService.addToCart(cartData).subscribe({
            next: (res) => {
              console.log('Item saved successfully:', res);
            },
            error: (err) => {
              console.error('Error saving item to cart:', err);
            },
          });
        }, 500);

        if (localDataObj.length > 0) {
          localStorage.removeItem('localCart');
        }
      });
    }

    setTimeout(() => {
      this.productService.getCartList(userId);
    }, 2000);
  }
}
