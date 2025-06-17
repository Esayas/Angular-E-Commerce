import { Injectable } from '@angular/core';
import { product } from '../data-type';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
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
}
