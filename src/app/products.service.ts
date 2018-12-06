import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Product } from './product';
import { Category } from './category';

const apiUrl = 'https://gdm-interview-api.azurewebsites.net/api/v1';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: Build out more complete error handler
      console.error(error);

      return of(result as T);
    };
  }

  getCategories(): Observable<Category[]> {
    const url = `${apiUrl}/categories`;
    return this.http.get<Category[]>(url)
      .pipe(
        tap(),
        catchError(this.handleError('getCategories', []))
      );
  }

  getProducts(): Observable<Product[]> {
    const url = `${apiUrl}/products`;
    return this.http.get<Product[]>(url)
      .pipe(
        tap(),
        catchError(this.handleError('getProducts', []))
      );
  }

  getProduct(productId: number): Observable<Product> {
    const url = `${apiUrl}/products/${productId}`;
    return this.http.get<Product>(url).pipe(
      tap(),
      catchError(this.handleError<Product>(`getProduct id=${productId}`))
    );
  }

  createProduct(product): Observable<Product> {
    const url = `${apiUrl}/products`;
    return this.http.post<Product>(url, product).pipe(
      tap(),
      catchError(this.handleError<Product>('addProduct'))
    );
  }

  updateProduct (productId, product): Observable<any> {
    const url = `${apiUrl}/products/${productId}`;
    return this.http.put(url, product).pipe(
      tap(),
      catchError(this.handleError<any>('updateProduct'))
    );
  }
}
