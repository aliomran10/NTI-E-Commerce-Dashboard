import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SubcategoriesService } from '../services/subcategories.service';
import { CategoriesService } from '../services/categories.service';

@Component({
  selector: 'app-update-subcategory',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './update-subcategory.component.html',
  styleUrl: './update-subcategory.component.scss'
})
export class UpdateSubcategoryComponent implements OnInit, OnDestroy {
  subscription: any;
  subscriptionCategories: any;
  id: string = '';
  categories: any[] = [];
  subcategory: any = '';
  subcategoryError: string = '';

  subcategoryForm = new FormGroup({
    name: new FormControl(null),
    category: new FormControl(null)
  })

  constructor(private _AuthService: AuthService, private _SubcategoriesService: SubcategoriesService, private _CategoriesService: CategoriesService,
    private _Router: Router, private _ActivatedRoute: ActivatedRoute) { }

  loadSubcategory(subcategoryId: string) {
    this.subscription = this._SubcategoriesService.getSubcategory(subcategoryId).subscribe({
      next: (res) => {
        this.subcategory = res.data
      },
      error: (err) => {
        this.subcategoryError = err.error.message
      }
    })
  }

  getAllCategories() {
    this.subscriptionCategories = this._CategoriesService.getCategories(200, undefined, 'name', '').subscribe({
      next: (res) => {
        this.categories = res.data
      }
    })
  }

  updateSubcategory(subcategoryId: string, formData: FormGroup) {
    this._SubcategoriesService.updateSubcategory(subcategoryId, formData.value).subscribe({
      next: (res) => {
        alert('subcategory updated');
        this._Router.navigate(['/subcategories']);
      },
      error: (err) => { this.subcategoryError = err.error.errors[0].msg }
    })
  }

  ngOnInit(): void {
    this._AuthService.checkToken();
    this.id = this._ActivatedRoute.snapshot.params['id'];
    this.loadSubcategory(this.id);
    this.getAllCategories();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.subscriptionCategories.unsubscribe();
  };
}
