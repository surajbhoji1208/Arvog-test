import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  // Users
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/users`);
  }

  getUser(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/users/${id}`);
  }

  createUser(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/users`, data);
  }

  updateUser(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/users/${id}`, data);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/users/${id}`);
  }

  // Categories
  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/categories`);
  }

  getCategory(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/categories/${id}`);
  }

  createCategory(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/categories`, data);
  }

  updateCategory(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/categories/${id}`, data);
  }

  // Products
  getProducts(page: number, limit: number, search: string, sort: string): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString())
      .set('search', search)
      .set('sort', sort);

    return this.http.get(`${this.baseUrl}/products`, { params });
  }

  getProduct(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/products/${id}`);
  }

  createProduct(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/products`, data);
  }

  updateProduct(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/products/${id}`, data);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/products/${id}`);
  }

  uploadProducts(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.baseUrl}/products/upload`, formData);
  }

  downloadReport(): void {
    window.open(`${this.baseUrl}/products/report`, '_blank');
  }
}
