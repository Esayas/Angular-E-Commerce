// import { NgModule } from '@angular/core;
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SellerAuthComponent } from './seller-auth/seller-auth.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { authGuard } from './auth.guard';
import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';
import { SellerUpdateProductComponent } from './seller-update-product/seller-update-product.component';
import { SearchComponent } from './search/search.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { CartPageComponent } from './cart-page/cart-page.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home', // Angular 16+ feature for page titles
  },
  {
    path: 'seller-auth',
    component: SellerAuthComponent,
    title: 'Seller Portal',
  },
  {
    path: 'search/:query',
    component: SearchComponent,
    title: 'search',
  },
  {
    path: 'detail/:productId',
    component: ProductDetailsComponent,
    title: 'product details',
  },
  {
    path: 'user-auth',
    component: UserAuthComponent,
    title: 'user auth',
  },
  {
    path: 'cart-page',
    component: CartPageComponent,
    title: 'cart page',
  },
  {
    path: 'seller-home',
    component: SellerHomeComponent,
    title: 'Seller Home',
    canActivate: [authGuard], // Guard to ensure user is logged in
  },
  {
    path: 'seller-add-product',
    component: SellerAddProductComponent,
    title: 'Seller Add Product',
    canActivate: [authGuard], // Guard to ensure user is logged in
  },
  {
    path: 'seller-update-product/:id',
    component: SellerUpdateProductComponent,
    title: 'Seller Update Product',
    canActivate: [authGuard], // Guard to ensure user is logged in
  },
  {
    path: '**',
    component: PageNotFoundComponent,
    title: '404 Not Found',
  },
];
