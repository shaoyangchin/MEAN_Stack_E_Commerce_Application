/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  apiURLProducts = environment.apiURL + 'products';
  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiURLProducts);
  }

  createProduct(productData: FormData): Observable<Product> {
    return this.http.post<Product>(this.apiURLProducts, productData);
  }

  getProduct(productId: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiURLProducts}/${productId}`);
  }

  updateProduct(productData: FormData, productId: string): Observable<Product> {
    return this.http.put<Product>(
      `${this.apiURLProducts}/${productId}`,
      productData
    );
  }

  deleteProduct(productId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiURLProducts}/${productId}`);
  }
}
