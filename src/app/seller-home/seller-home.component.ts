import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-seller-home',
  imports: [FontAwesomeModule, RouterModule],
  templateUrl: './seller-home.component.html',
  styleUrl: './seller-home.component.css',
})

export class SellerHomeComponent {
  productList: undefined | product[];
  productMessage: undefined | string;

  // currentPage: number = 1;
  // itemsPerPage: number = 6;

  faTrash = faTrash;
  faEdit = faEdit;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.list();
  }

  deleteProduct(id: string) {
    // console.log('TG', 'Delete Product', id);
    this.productService.deleteProduct(id).subscribe((res) => {
      console.log('TG', 'Delete Product', res);
      if (res) {
        this.productMessage = 'Product deleted successfully';
      }
    });
    this.list();
    setTimeout(() => {
      this.productMessage = undefined;
    }, 3000);
  }

  list() {
    this.productService.getAllProducts().subscribe((data) => {
      if (data) {
        this.productList = data;
      }
    });
  }
}
