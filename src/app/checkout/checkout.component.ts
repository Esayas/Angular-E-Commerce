import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { cart, order, priceSummary } from '../data-type';
import { ProductService } from '../services/product.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-checkout',
  imports: [FormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent {
  totalPrice: number | undefined;
  cartData: cart[] | undefined;
  orderMessage: string | undefined;

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);

    userData &&
      this.productService.getCurrentUserCart(userData.id).subscribe((res) => {
        if (res.body) {
          let price = 0;
          this.cartData = res.body;
          res.body.forEach((item) => {
            if (item.quantity) {
              price += item.price * item.quantity;
            }
          });

          this.totalPrice = price + price / 10 + 100 - price / 10;
          console.log('totalPrice', this.totalPrice);
        }
      });
  }

  orderNow(data: {
    email: string;
    address: string;
    contact: string;
    total: number;
  }) {
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    if (this.totalPrice) {
      let orderData: order = {
        ...data,
        totalPrice: this.totalPrice,
        userId: userId,
        id: undefined,
      };

      if (this.cartData) {
        this.cartData.forEach((item) => {
          setTimeout(() => {
            if (item.id) {
              this.productService.deleteCartItems(item.id);
            }
          }, 4000);
        });
      }

      this.productService.orderItems(orderData).subscribe((res) => {
        // console.log('res', res);
        if (res) {
          this.orderMessage = 'Successfully ordered';
          setTimeout(() => {
            this.orderMessage = undefined;
          }, 600);
          this.router.navigate(['/my-orders']);
        } else {
          alert('Something went wrong, Please try again');
          // this.router.navigate(['/order-failed']);
        }
      });
      this.router.navigate(['/my-orders']);
    }
  }
}
