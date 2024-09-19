import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CouponsService } from '../services/coupons.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-update-coupon',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './update-coupon.component.html',
  styleUrl: './update-coupon.component.scss'
})
export class UpdateCouponComponent implements OnInit, OnDestroy {
  subscription: any;
  coupon: any = {};
  couponError: string = '';
  id: string = '';
  couponForm = new FormGroup({
    name: new FormControl(null),
    discount: new FormControl(null, [Validators.min(1), Validators.max(100)]),
    expireTime: new FormControl(null),
  })
  constructor(private _AuthService: AuthService, private _CouponService: CouponsService,
    private _ActivatedRoute: ActivatedRoute, private _Router: Router) { }

  loadCoupon(couponId: string) {
    this.subscription = this._CouponService.getCoupon(couponId).subscribe({
      next: (res) => { this.coupon = res.data }, error: (err) => { }
    })
  }

  updateCoupon(couponId: string, formData: FormGroup) {
    console.log(formData.value);
    if (formData.value.name === null) {
      formData.value.name = this.coupon.name
    }
    if (formData.value.discount === null) {
      formData.value.discount = this.coupon.discount
    }
    if (formData.value.expireTime === null) {
      formData.value.expireTime = new DatePipe(this.coupon.expireTime).transform
    }
    console.log(formData.value);
    this._CouponService.updateCoupon(couponId, formData.value).subscribe({
      next: (res) => {
        alert('coupon updated successfully');
        this._Router.navigate(['/coupons']);
      }, error: (err) => { this.couponError = err.error.errors[0].msg }
    })
  }

  ngOnInit(): void {
    this._AuthService.checkToken();
    this.id = this._ActivatedRoute.snapshot.params['id'];
    this.loadCoupon(this.id);
  }

  ngOnDestroy(): void { this.subscription.unsubscribe(); }
}
