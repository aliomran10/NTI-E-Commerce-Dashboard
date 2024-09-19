import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CategoriesService } from '../services/categories.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-category',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './update-category.component.html',
  styleUrl: './update-category.component.scss'
})
export class UpdateCategoryComponent implements OnInit, OnDestroy {
  subscription: any;
  id: string = '';
  category: any = '';
  categoryError: string = '';
  categoryForm = new FormGroup({
    name: new FormControl(null, [Validators.required]),
  })
  constructor(private _AuthService: AuthService, private _CategoriesService: CategoriesService,
    private _Router: Router, private _ActivatedRoute: ActivatedRoute) { }

  loadCategory(categoryId: string) {
    this.subscription = this._CategoriesService.getCategory(categoryId).subscribe({
      next: (res) => {
        this.category = res.data
      },
      error: (err) => {
        this.categoryError = err.error.message
      }
    })
  }

  updateCategory(categoryId: string, formData: FormGroup) {
    this._CategoriesService.updateCategory(categoryId, formData.value).subscribe({
      next: (res) => {
        alert('category updated');
        this._Router.navigate(['/categories']);
      },
      error: (err) => { this.categoryError = err.error.errors[0].msg }
    })
  }

  ngOnInit(): void {
    this._AuthService.checkToken();
    this.id = this._ActivatedRoute.snapshot.params['id'];
    this.loadCategory(this.id);
  }

  ngOnDestroy(): void { this.subscription.unsubscribe() };
}
