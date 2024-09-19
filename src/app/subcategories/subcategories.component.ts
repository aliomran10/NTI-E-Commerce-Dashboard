import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { SubcategoriesService } from '../services/subcategories.service';

@Component({
  selector: 'app-subcategories',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './subcategories.component.html',
  styleUrl: './subcategories.component.scss'
})
export class SubcategoriesComponent implements OnInit, OnDestroy {
  subscription: any;
  subcategories: any[] = [];
  pagination: any;
  page: number = 1;
  search: string = '';
  constructor(private _AuthService: AuthService, private _SubcategoriesService: SubcategoriesService) { };

  loadSubcategories() {
    this.subscription = this._SubcategoriesService.getSubcategories(50, this.page, '-createdAt', this.search).subscribe({
      next: (res) => {
        this.subcategories = res.data;
        this.pagination = res.pagination;
      }, error: (err) => { }
    })
  }

  deleteSubcategory(subCategoryId: string) {
    this._SubcategoriesService.deleteSubcategory(subCategoryId).subscribe({
      next: (res) => {
        this.loadSubcategories();
        alert('Subcategory deleted')
      }, error: (err) => { }
    })
  }

  changePage(page: number) {
    this.page = page;
    this.loadSubcategories();
  }

  searchData(data: string) {
    this.search = data;
    this.loadSubcategories()
  }

  ngOnInit(): void {
    this._AuthService.checkToken();
    this.loadSubcategories();
  }

  ngOnDestroy(): void { this.subscription.unsubscribe() };
}
