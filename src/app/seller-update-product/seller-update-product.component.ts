import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-seller-update-product',
  imports: [FormsModule],
  templateUrl: './seller-update-product.component.html',
  styleUrl: './seller-update-product.component.css',
})
export class SellerUpdateProductComponent {
  productMessage: undefined | string;
  productData: undefined | product;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get('id');
    // console.log('id', productId);
    if (productId) {
      // Add a check to ensure productId is not null
      this.productService.getProductById(productId).subscribe((res) => {
        // console.log('TG', res);
        this.productData = res;
        // console.log('ProductData', this.productData);
      });
    }
  }

  submit(data: product) {
    console.log('data', data);
    if (this.productData) {
      data.id = this.productData.id;
    }
    this.productService.updateProduct(data).subscribe((res) => {
      if (res) {
        this.productMessage = 'Product has update';
      }
    });

    setTimeout(() => {
      this.productMessage = undefined;
    }, 3000);
    console.log('data', data);
  }
}
