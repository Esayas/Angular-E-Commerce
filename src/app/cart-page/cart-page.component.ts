import { Component } from '@angular/core';
import { cart, priceSummary } from '../data-type';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  imports: [],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css',
})
export class CartPageComponent {
  cartData: cart[] | undefined;
  priceSummary: priceSummary = {
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 0,
    total: 0,
  };
  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.loadPage();
  }

  checkout() {
    this.router.navigateByUrl('/checkout');
  }

  removeFromCart(cartId: string | undefined) {
    cartId &&
      this.productService.removeItemFromCartById(cartId).subscribe((res) => {
        console.log('res', res);
        this.loadPage();
      });
  }

  loadPage() {
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);

    userData &&
      this.productService.getCurrentUserCart(userData.id).subscribe((res) => {
        if (res.body) {
          this.cartData = res.body;
          console.log('TG', this.cartData);
          let price = 0;
          res.body.forEach((item) => {
            if (item.quantity) {
              price += item.price * item.quantity;
            }
          });

          this.priceSummary.price = price;
          this.priceSummary.discount = price / 10;
          this.priceSummary.tax = price / 10;
          this.priceSummary.delivery = 100;
          this.priceSummary.total = price + price / 10 + 100 - price / 10;

          if (this.cartData.length === 0) {
            this.router.navigateByUrl('/');
          }
        }
      });
  }
}
