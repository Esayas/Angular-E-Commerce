import { EventEmitter, Injectable } from '@angular/core';
import { cart, product } from '../data-type';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  cartData = new EventEmitter<product[] | []>();

  constructor(private http: HttpClient) {}

  addProduct(data: product) {
    // console.log('Added Product API');
    return this.http.post('http://localhost:3000/products', data);
  }

  getAllProducts() {
    // console.log('Product List API');
    return this.http.get<product[]>('http://localhost:3000/products');
  }

  deleteProduct(id: string) {
    return this.http.delete(`http://localhost:3000/products/${id}`);
  }

  getProductById(id: string) {
    return this.http.get<product>(`http://localhost:3000/products/${id}`);
  }

  updateProduct(product: product) {
    return this.http.put<product>(
      `http://localhost:3000/products/${product.id}`,
      product
    );
  }

  getpopularProducts() {
    return this.http.get<product[]>('http://localhost:3000/products?_limit=3');
  }

  getSearchProduct(query: string) {
    return this.http.get<product[]>(
      `http://localhost:3000/products?q=${query}`
    );
  }

  getSearchProductByName(name: string) {
    // console.log('name', name);
    return this.http.get<product[]>(
      `http://localhost:3000/products?name=${name}`
    );
  }

  // getSearchProductByName(name: string) {
  //   console.log('name', name);
  //   return this.http.get<product[]>(
  //     `http://localhost:3000/products?name_like=${name}`
  //   );
  // }

  // getSearchProductByName(name: string) {
  //   console.log('name', name);
  //   return this.http.get<product[]>(`http://localhost:3000/products?q=${name}`);
  // }

  // getSearchProductByName(name: string): Observable<product[]> {
  //   console.log('Searching for product:', name);
  //   return this.http.get<product[]>(
  //     `http://localhost:3000//products?name_like=${encodeURIComponent(name)}`
  //   );
  // }

  searchProductsByName(query: string): Observable<product[]> {
    return this.http.get<product[]>(
      `http://localhost:3000/products?name_like=${query}`
    );
  }

  localAddToCart(product: product) {
    let cartData = [];
    let localCart = localStorage.getItem('localCart');
    if (!localCart) {
      localStorage.setItem('localCart', JSON.stringify([product]));
    } else {
      cartData = JSON.parse(localCart);
      cartData.push(product);
      localStorage.setItem('localCart', JSON.stringify(cartData));
      this.cartData.emit(cartData);
    }
  }

  removeItemFromCart(productId: string) {
    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      let items: product[] = JSON.parse(cartData);
      items = items.filter((item) => item.id !== productId);
      localStorage.setItem('localCart', JSON.stringify(items));
      this.cartData.emit(items);
    }
  }

  addToCart(cartData: cart) {
    return this.http.post('http://localhost:3000/cart', cartData);
  }

  getCartList(userId: string) {
    // return this.http.get<cart[]>(`http://localhost:3000/cart/${userId}`);
    return this.http
      .get<product[]>('http://localhost:3000/cart?userId=' + userId, {
        observe: 'response',
      })
      .subscribe((res) => {
        if (res && res.body) {
          console.log('Cart List:', res.body);
          this.cartData.emit(res.body);
        }
      });
  }

  clearCartCount() {
    this.cartData.emit([]);
  }

  removeItemFromCartById(cartId: string) {
    return this.http.delete(`http://localhost:3000/cart/${cartId}`);
  }

  getCurrentUserCart(userId: string) {
    return this.http.get<cart[]>(
      'http://localhost:3000/cart?userId=' + userId,
      {
        observe: 'response',
      }
    );
  }
}
