import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CouponsService {
  private apiUrl: string = '';
  private routeName: string = '';
  constructor(private _HttpClient: HttpClient, private _GlobalService: GlobalService) {
    this.apiUrl = this._GlobalService.apiHostName;
    this.routeName = this._GlobalService.couponsRoute;
  }

  getCoupons(limit: number = 50, page: number = 1, sort: string = '-createdAt', search: string): Observable<any> {
    return this._HttpClient.get(`${this.apiUrl}${this.routeName}?limit=${limit}&page=${page}&sort=${sort}&search=${search}`,
      { headers: { authorization: `Bearer ${localStorage.getItem('user')}` } }
    )
  }

  getCoupon(couponId: string): Observable<any> {
    return this._HttpClient.get(`${this.apiUrl}${this.routeName}/${couponId}`,
      { headers: { authorization: `Bearer ${localStorage.getItem('user')}` } })
  }

  createCoupon(formData: any): Observable<any> {
    return this._HttpClient.post(`${this.apiUrl}${this.routeName}`, formData,
      { headers: { authorization: `Bearer ${localStorage.getItem('user')}` } })
  }

  updateCoupon(couponId: string, formData: any): Observable<any> {
    return this._HttpClient.put(`${this.apiUrl}${this.routeName}/${couponId}`, formData,
      { headers: { authorization: `Bearer ${localStorage.getItem('user')}` } })
  }

  deleteCoupon(couponId: string): Observable<any> {
    return this._HttpClient.delete(`${this.apiUrl}${this.routeName}/${couponId}`,
      { headers: { authorization: `Bearer ${localStorage.getItem('user')}` } })
  }
}
