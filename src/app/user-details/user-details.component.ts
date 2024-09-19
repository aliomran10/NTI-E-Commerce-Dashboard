import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../services/users.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})
export class UserDetailsComponent implements OnInit, OnDestroy {
  subscription: any;
  user: any = {};
  userImage: string = '';
  userImageFile: any;
  userName: string = '';
  id: string = '';
  changePasswordError: string = '';
  changePasswordForm: FormGroup = new FormGroup({
    password: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
    confirmPassword: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
  });
  getFile(event: any) {
    const image = event.target.files[0];
    if (image) { this.userImageFile = image };
  }
  constructor(private _AuthService: AuthService, private _UserService: UsersService,
    private _Router: Router, private _ActivatedRoute: ActivatedRoute) { }

  loadUser(userId: string) {
    this.subscription = this._UserService.getUser(userId).subscribe({
      next: (res) => { this.user = res.data },
      error: (err) => { }
    })
  }

  updateUserInfo(userId: string) {
    const formData = new FormData();
    formData.append('name', this.userName);
    if (this.userImageFile) { formData.append('image', this.userImageFile) };
    this._UserService.updateUser(userId, formData).subscribe({
      next: (res) => {
        this.loadUser(userId);
        alert('user information updated');
      },
      error: (err) => { }
    })
  }

  changeUserPassword(userId: string, formData: FormGroup) {
    this._UserService.updateUserPassword(userId, formData.value).subscribe({
      next: (res) => {
        alert('user password changed');
        this._Router.navigate(['/users']);
      },
      error: (err) => {
        this.changePasswordError = err.error.errors[0].msg
      }
    })
  }

  ngOnInit(): void {
    this._AuthService.checkToken();
    this.id = this._ActivatedRoute.snapshot.params['id']
    this.userImage = this._UserService.userImage;
    this.loadUser(this.id);
  }

  ngOnDestroy(): void { this.subscription.unsubscribe() };
}
