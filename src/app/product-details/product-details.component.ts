import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-product-details',
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent {
  productDetails: undefined | product;
  productQuantity: number = 1;

  constructor(
    private activeRoute: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit() {
    let productId = this.activeRoute.snapshot.paramMap.get('productId');
    // console.log('Id', productId);
    productId &&
      this.productService.getProductById(productId).subscribe((res) => {
        console.log('product', res);
        this.productDetails = res;
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
      }
    }

    // this.productService.addToCart(this.productDetails);
  }
}
