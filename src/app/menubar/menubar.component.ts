import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-menubar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './menubar.component.html',
  styleUrl: './menubar.component.scss'
})
export class MenubarComponent implements OnInit {
  user: any = {};
  constructor(private _AuthService: AuthService, private _Router: Router) { }
  logout() {
    this._AuthService.logout();
    this._Router.navigate(['/login'])
  }

  ngOnInit(): void {
    this.user = this._AuthService.currentUser.getValue();
  }
}
