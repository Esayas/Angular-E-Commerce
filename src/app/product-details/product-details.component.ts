import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { cart, product } from '../data-type';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-product-details',
  imports: [NgIf],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent {
  productDetails: undefined | product;
  productQuantity: number = 1;
  removeCart = false;
  cartData: product | undefined;

  constructor(
    private activeRoute: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit() {
    let productId = this.activeRoute.snapshot.paramMap.get('productId');
    // console.log('Id', productId);
    productId &&
      this.productService.getProductById(productId).subscribe((res) => {
        this.productDetails = res;

        let cartData = localStorage.getItem('localCart');

        if (cartData && productId) {
          let items = JSON.parse(cartData);
          items = items.filter((item: product) => {
            return item.id === productId.toString();
          });
          console.log('Items', items);
          if (items.length) {
            this.removeCart = true;
          } else {
            this.removeCart = false;
          }
        }

        let user = localStorage.getItem('user');
        if (user) {
          console.log('initial user', JSON.parse(user));
          let userId = JSON.parse(user).id;
          this.productService.getCartList(userId);

          this.productService.cartData.subscribe((res) => {
            let items = res.filter(
              (item: product) => productId === item.productId
            );
            if (items.length) {
              this.removeCart = true;
              this.cartData = items[0];
            } else {
              this.removeCart = false;
            }
          });
        }
      });
  }

  handleQuantity(val: string) {
    if (this.productQuantity < 20 && val === 'inc') {
      this.productQuantity++;
    } else if (this.productQuantity > 1 && val === 'dec') {
      this.productQuantity--;
    }
    console.log(this.productQuantity);
  }

  addToCart() {
    if (this.productDetails) {
      this.productDetails.quantity = this.productQuantity;
      // console.log('product', this.productDetails);
      if (localStorage.getItem('user')) {
        this.productService.localAddToCart(this.productDetails);
        this.removeCart = true;

        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user).id;
        // console.log('User Id', userId);
        let cartData: cart = {
          ...this.productDetails,
          productId: this.productDetails.id,
          userId,
        };
        delete cartData.id;
        //add to Cart
        this.productService.addToCart(cartData).subscribe((res) => {
          if (res) {
            this.productService.getCartList(userId);
            this.removeCart = true;
          }
        });
      }
    }

    // this.productService.addToCart(this.productDetails);
  }

  removeFromCart(productId: string) {
    if (!localStorage.getItem('user')) {
      this.productService.removeItemFromCart(productId);
    } else {
      // this.productService.removeItemFromCartById(productId);
      // console.log('TG', this.cartData);
      // console.log('TG33', productId);
      this.cartData &&
        this.productService
          .removeItemFromCartById(this.cartData?.id)
          .subscribe((res) => {
            if (res) {
              let user = localStorage.getItem('user');
              let userId = user && JSON.parse(user).id;
              this.productService.getCartList(userId);
            }
          });
    }
    this.removeCart = false;
  }
}
