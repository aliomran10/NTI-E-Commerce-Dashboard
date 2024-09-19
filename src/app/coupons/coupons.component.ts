import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CouponsService } from '../services/coupons.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-coupons',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './coupons.component.html',
  styleUrl: './coupons.component.scss'
})
export class CouponsComponent implements OnInit, OnDestroy {
  subscription: any;
  coupons: any[] = [];
  pagination: any;
  page: number = 1;
  search: string = '';

  constructor(private _AuthService: AuthService, private _CouponsService: CouponsService) { }

  loadCoupons() {
    this.subscription = this._CouponsService.getCoupons(50, this.page, '-createdAt', this.search).subscribe({
      next: (res) => {
        this.coupons = res.data;
        this.pagination = res.pagination;
      }, error: (err) => { }
    })
  }

  deleteCoupon(couponId: string) {
    this._CouponsService.deleteCoupon(couponId).subscribe({
      next: (res) => {
        this.loadCoupons();
        alert('Coupon deleted')
      }, error: (err) => { }
    })
  }

  changePage(page: number) {
    this.page = page;
    this.loadCoupons();
  }

  searchData(data: string) {
    this.search = data;
    this.loadCoupons()
  }

  ngOnInit(): void {
    this._AuthService.checkToken();
    this.loadCoupons();
  }

  ngOnDestroy(): void { this.subscription.unsubscribe() };
}
