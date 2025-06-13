import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-header',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  menuType: string = 'default';
  sellerName: string = '';
  currentUrl: string = '';

  constructor(private router: Router) {
    this.currentUrl = this.router.url;

    console.log('Current URL', this.currentUrl);
  }

  ngOnInit(): void {
    this.router.events.subscribe((val: any) => {
      if (val.url) {
        console.log('Event', val.url);
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          // console.log('This is seller page');
          // console.log('Current URL', this.currentUrl);
          let sellerStore = localStorage.getItem('seller');
          let sellerData = sellerStore && JSON.parse(sellerStore)[0];
          this.sellerName = sellerData.name;

          this.menuType = 'seller';
        } else {
          // console.log('This is not seller page');
          this.menuType = 'default';
        }
      }
    });
  }

  logout() {
    localStorage.removeItem('seller');
    this.router.navigateByUrl('/');
    this.menuType = 'default';
  }

  searchProduct(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement;
      console.log('TG', element.value);
    }
  }
}
