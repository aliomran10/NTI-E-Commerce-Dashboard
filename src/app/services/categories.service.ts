import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private apiUrl: string = '';
  private routeName: string = '';
  constructor(private _HttpClient: HttpClient, private _GlobalService: GlobalService) {
    this.apiUrl = this._GlobalService.apiHostName;
    this.routeName = this._GlobalService.categoriesRoute;
  }

  getCategories(limit: number = 50, page: number = 1, sort: string = '-createdAt', search: string): Observable<any> {
    return this._HttpClient.get(`${this.apiUrl}${this.routeName}?limit=${limit}&page=${page}&sort=${sort}&search=${search}`)
  }

  getCategory(categoryId: string): Observable<any> {
    return this._HttpClient.get(`${this.apiUrl}${this.routeName}/${categoryId}`)
  }

  createCategory(formData: any): Observable<any> {
    return this._HttpClient.post(`${this.apiUrl}${this.routeName}`, formData, { headers: { authorization: `Bearer ${localStorage.getItem('user')}` } })
  }

  updateCategory(categoryId: string, formData: any): Observable<any> {
    return this._HttpClient.put(`${this.apiUrl}${this.routeName}/${categoryId}`, formData, { headers: { authorization: `Bearer ${localStorage.getItem('user')}` } })
  }

  deleteCategory(categoryId: string): Observable<any> {
    return this._HttpClient.delete(`${this.apiUrl}${this.routeName}/${categoryId}`, { headers: { authorization: `Bearer ${localStorage.getItem('user')}` } })
  }
}
