import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from './global.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubcategoriesService {
  private apiUrl: string = '';
  private routeName: string = '';
  private categoriesRoute: string = '';
  constructor(private _HttpClient: HttpClient, private _GlobalService: GlobalService) {
    this.apiUrl = this._GlobalService.apiHostName;
    this.routeName = this._GlobalService.subcategoriesRoute;
    this.categoriesRoute = this._GlobalService.categoriesRoute;
  }

  getSpecificSubcategories(categoryId: string, limit: number = 200, sort: string = 'name'): Observable<any> {
    return this._HttpClient.get(`${this.apiUrl}${this.categoriesRoute}/${categoryId}/subcategories?limit=${limit}&sort=${sort}`)
  }

  getSubcategories(limit: number = 50, page: number = 1, sort: string = '-createdAt', search: string): Observable<any> {
    return this._HttpClient.get(`${this.apiUrl}${this.routeName}?limit=${limit}&page=${page}&sort=${sort}&search=${search}`)
  }

  getSubcategory(subcategoryId: string): Observable<any> {
    return this._HttpClient.get(`${this.apiUrl}${this.routeName}/${subcategoryId}`)
  }

  createSubcategory(formData: any): Observable<any> {
    return this._HttpClient.post(`${this.apiUrl}${this.routeName}`, formData, { headers: { authorization: `Bearer ${localStorage.getItem('user')}` } })
  }

  updateSubcategory(subcategoryId: string, formData: any): Observable<any> {
    return this._HttpClient.put(`${this.apiUrl}${this.routeName}/${subcategoryId}`, formData, { headers: { authorization: `Bearer ${localStorage.getItem('user')}` } })
  }

  deleteSubcategory(subcategoryId: string): Observable<any> {
    return this._HttpClient.delete(`${this.apiUrl}${this.routeName}/${subcategoryId}`, { headers: { authorization: `Bearer ${localStorage.getItem('user')}` } })
  }
}
