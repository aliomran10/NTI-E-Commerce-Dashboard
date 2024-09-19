import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private apiUrl: string = '';
  private routeName: string = '';
  constructor(private _HttpClient: HttpClient, private _GlobalService: GlobalService) {
    this.apiUrl = this._GlobalService.apiHostName;
    this.routeName = this._GlobalService.orderRoute;
  }

  getOrders(limit: number = 50, page: number = 1, sort: string = '-createdAt', search: string): Observable<any> {
    return this._HttpClient.get(`${this.apiUrl}${this.routeName}?limit=${limit}&page=${page}&sort=${sort}&search=${search}`,
      { headers: { authorization: `Bearer ${localStorage.getItem('user')}` } }
    )
  }

  getOrder(orderId: string): Observable<any> {
    return this._HttpClient.get(`${this.apiUrl}${this.routeName}/${orderId}`,
      { headers: { authorization: `Bearer ${localStorage.getItem('user')}` } }
    )
  }

  updateDeliveredOrder(orderId: string): Observable<any> {
    return this._HttpClient.put(`${this.apiUrl}${this.routeName}/${orderId}/delivered`, {},
      { headers: { authorization: `Bearer ${localStorage.getItem('user')}` } })
  }

  updatePaidOrder(orderId: string): Observable<any> {
    return this._HttpClient.put(`${this.apiUrl}${this.routeName}/${orderId}/paid`, {},
      { headers: { authorization: `Bearer ${localStorage.getItem('user')}` } })
  }

}
