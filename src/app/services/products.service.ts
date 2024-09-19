import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl: string = '';
  private routeName: string = '';
  productsImages: string = '';
  constructor(private _HttpClient: HttpClient, private _GlobalService: GlobalService) {
    this.apiUrl = this._GlobalService.apiHostName;
    this.routeName = this._GlobalService.productsRoute;
    this.productsImages = this._GlobalService.productsImages;
  }

  getAllProducts(limit: number = 50, page: number = 1, sort: string = '-createdAt', search: string): Observable<any> {
    return this._HttpClient.get(`${this.apiUrl}${this.routeName}?limit=${limit}&page=${page}&sort=${sort}&search=${search}`)
  }

  getProduct(productId: string): Observable<any> {
    return this._HttpClient.get(`${this.apiUrl}${this.routeName}/${productId}`);
  }

  createProduct(formData: any): Observable<any> {
    return this._HttpClient.post(`${this.apiUrl}${this.routeName}`, formData, { headers: { authorization: `Bearer ${localStorage.getItem('user')}` } })
  }

  updateProduct(productId: string, formData: any): Observable<any> {
    return this._HttpClient.put(`${this.apiUrl}${this.routeName}/${productId}`, formData, { headers: { authorization: `Bearer ${localStorage.getItem('user')}` } })
  }

  deleteProduct(productId: string): Observable<any> {
    return this._HttpClient.delete(`${this.apiUrl}${this.routeName}/${productId}`, { headers: { authorization: `Bearer ${localStorage.getItem('user')}` } })
  }
}
