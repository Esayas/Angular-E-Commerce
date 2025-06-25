import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { order } from '../data-type';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-my-orders',
  imports: [CommonModule],
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.css',
})
export class MyOrdersComponent {
  orderData: order[] | undefined;
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getOrderList();
  }

  cancelOrder(orderId: string | undefined) {
    orderId &&
      this.productService.cancelOrder(orderId).subscribe((result) => {
        if (result) {
          this.getOrderList();
        }
      });
  }

  getOrderList() {
    let userStore = localStorage.getItem('user');
    let userId = userStore && JSON.parse(userStore).id;

    this.productService.getOrderListsByUserId(userId).subscribe((res) => {
      // console.log('Order', res.body);
      if (res) {
        this.orderData = res.body ?? [];
      }
    });
  }
}
