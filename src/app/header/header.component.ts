import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import e from 'express';
import { product } from '../data-type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  menuType: string = 'default';
  sellerName: string = '';
  userName: string = '';
  currentUrl: string = '';
  searchResult: undefined | product[];
  cartItems: number = 0;

  constructor(private router: Router, private productService: ProductService) {
    this.currentUrl = this.router.url;

    // console.log('Current URL', this.currentUrl);
  }

  ngOnInit(): void {
    this.router.events.subscribe((val: any) => {
      if (val.url) {
        // console.log('Event', val.url);
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          // console.log('This is seller page');
          // console.log('Current URL', this.currentUrl);
          let sellerStore = localStorage.getItem('seller');
          let sellerData = sellerStore && JSON.parse(sellerStore)[0];
          this.sellerName = sellerData.name;

          this.menuType = 'seller';
        } else if (localStorage.getItem('user')) {
          let userStore = localStorage.getItem('user');
          let userData = userStore && JSON.parse(userStore);
          // console.log('userData', userData);
          this.userName = userData.name;
          this.menuType = 'user';
          this.productService.getCartList(userData.id);
        } else {
          // console.log('This is not seller page');
          this.menuType = 'default';
        }
      }
    });

    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      this.cartItems = JSON.parse(cartData).length;
    } else {
      this.cartItems = 0;
    }

    this.productService.cartData.subscribe((items: any) => {
      this.cartItems = items.length;
    });
  }

  logout() {
    localStorage.removeItem('seller');
    this.router.navigateByUrl('/');
    this.menuType = 'default';
  }

  userLogout() {
    localStorage.removeItem('user');
    this.router.navigateByUrl('/user-auth');
    this.productService.cartData.emit([]);
    // this.menuType = 'default';
  }

  searchProduct(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement;
      //console.log('TG', element.value);
      this.productService
        .getSearchProductByName(element.value)
        .subscribe((res) => {
          //console.log("Esayas",res);
          this.searchResult = res;
        });
    }
  }

  hideSearchResult() {
    this.searchResult = undefined;
  }

  submitSearch(val: string) {
    // const currentUrl = this.router.url;
    // console.log('Current URL:', currentUrl);
    // if (!currentUrl.includes('search')) {
    this.router.navigateByUrl('/search/' + val);
    // } else {
    //   console.log('Reload URL:', currentUrl);
    //   window.location.reload();
    // }
  }

  redirectToDetails(id: string) {
    this.router.navigateByUrl('/detail/' + id);
  }
}
