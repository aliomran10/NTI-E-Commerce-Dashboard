import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl: string = '';
  private routeName: string = '';
  userImage: string = '';

  constructor(private _HttpClient: HttpClient, private _GlobalService: GlobalService) {
    this.apiUrl = this._GlobalService.apiHostName;
    this.routeName = this._GlobalService.usersRoute;
    this.userImage = this._GlobalService.userImage;
  }

  getUsers(limit: number = 50, page: number = 1, sort: string = '-createdAt', search: string, role: string = 'admin'): Observable<any> {
    return this._HttpClient.get(`${this.apiUrl}${this.routeName}?limit=${limit}&page=${page}&sort=${sort}&search=${search}&role=${role}&fields=-password`,
      { headers: { authorization: `Bearer ${localStorage.getItem('user')}` } }
    )
  }

  getUser(userId: string): Observable<any> {
    return this._HttpClient.get(`${this.apiUrl}${this.routeName}/${userId}`,
      { headers: { authorization: `Bearer ${localStorage.getItem('user')}` } }
    )
  }

  createUser(formData: any): Observable<any> {
    return this._HttpClient.post(`${this.apiUrl}${this.routeName}`, formData,
      { headers: { authorization: `Bearer ${localStorage.getItem('user')}` } })
  }

  updateUser(userId: string, formData: any): Observable<any> {
    return this._HttpClient.put(`${this.apiUrl}${this.routeName}/${userId}`,
      formData, { headers: { authorization: `Bearer ${localStorage.getItem('user')}` } })
  }

  updateUserPassword(userId: string, formData: any): Observable<any> {
    return this._HttpClient.put(`${this.apiUrl}${this.routeName}/${userId}/changePassword`,
      formData, { headers: { authorization: `Bearer ${localStorage.getItem('user')}` } })
  }

  deleteUser(userId: string): Observable<any> {
    return this._HttpClient.delete(`${this.apiUrl}${this.routeName}/${userId}`,
      { headers: { authorization: `Bearer ${localStorage.getItem('user')}` } })
  }
}
