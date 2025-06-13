import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-seller-add-product',
  imports: [FormsModule],
  templateUrl: './seller-add-product.component.html',
  styleUrl: './seller-add-product.component.css',
})
export class SellerAddProductComponent {
  addProductMessage: string | undefined;
  constructor(private productService: ProductService) {}

  ngOnInit(): void {}

  submit(data: product) {
    // console.log(data);
    this.productService.addProduct(data).subscribe((res) => {
      // console.log('Esayas', res);
      if (res) {
        this.addProductMessage = 'Product added successfully';
      }
    });

    setTimeout(() => {
      this.addProductMessage = undefined;
    }, 3000);
  }
}
