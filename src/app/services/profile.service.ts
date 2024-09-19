import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl: string = '';
  private routeName: string = '';
  userImage: string = '';
  constructor(private _HttpClient: HttpClient, private _GlobalService: GlobalService) {
    this.apiUrl = this._GlobalService.apiHostName;
    this.routeName = this._GlobalService.usersRoute;
    this.userImage = this._GlobalService.userImage;
  }

  getLoggedUser(): Observable<any> {
    return this._HttpClient.get(`${this.apiUrl}${this.routeName}/me`,
      { headers: { authorization: `Bearer ${localStorage.getItem('user')}` } }
    )
  }

  updateLoggedUser(formData: any): Observable<any> {
    return this._HttpClient.put(`${this.apiUrl}${this.routeName}/updateMe`,
      formData, { headers: { authorization: `Bearer ${localStorage.getItem('user')}` } })
  }

  updateLoggedUserPassword(formData: any): Observable<any> {
    return this._HttpClient.put(`${this.apiUrl}${this.routeName}/changeMyPassword`,
      formData, { headers: { authorization: `Bearer ${localStorage.getItem('user')}` } })
  }
}
