import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl: string = '';
  private routeName: string = '';
  currentUser = new BehaviorSubject(null);

  constructor(private _HttpClient: HttpClient, private _GlobalService: GlobalService, private _Router: Router) {
    this.apiUrl = this._GlobalService.apiHostName;
    this.routeName = this._GlobalService.authRoute;
    if (localStorage.getItem('user') !== null) { this.saveCurrentUser() };
  }

  saveCurrentUser() {
    const token: any = localStorage.getItem('user');
    this.currentUser.next(jwtDecode(token));
  }

  checkToken() {
    const token: any = localStorage.getItem('user');
    const decodedToken = jwtDecode(token);
    if (decodedToken.exp! < Date.now() / 1000) {
      this.logout();
      this._Router.navigate(['/login'])
    }
  }

  login(formData: any): Observable<any> {
    return this._HttpClient.post(`${this.apiUrl}${this.routeName}/login`, formData)
  }
  sendMail(formData: any): Observable<any> {
    return this._HttpClient.post(`${this.apiUrl}${this.routeName}/forgetPassword`, formData)
  }
  verifyCode(formData: any): Observable<any> {
    return this._HttpClient.post(`${this.apiUrl}${this.routeName}/verifyCode`, formData, { headers: { authorization: `Bearer ${localStorage.getItem('verify')}` } })
  }
  resetPassword(formData: any): Observable<any> {
    return this._HttpClient.put(`${this.apiUrl}${this.routeName}/resetCode`, formData, { headers: { authorization: `Bearer ${localStorage.getItem('verify')}` } })
  }
  logout() {
    localStorage.removeItem('user');
    this.currentUser.next(null)
  }

}
