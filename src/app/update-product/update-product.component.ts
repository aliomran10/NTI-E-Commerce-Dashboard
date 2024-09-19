import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ProductsService } from '../services/products.service';
import { CategoriesService } from '../services/categories.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SubcategoriesService } from '../services/subcategories.service';

@Component({
  selector: 'app-update-product',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.scss'
})
export class UpdateProductComponent implements OnInit, OnDestroy {
  subscription: any;
  subscriptionCategories: any;
  subscriptionSubcategories: any;
  id: string = '';
  product: any = '';
  productError: string = '';
  products: any[] = [];
  categories: any[] = [];
  subcategories: any[] = [];

  productForm = new FormGroup({
    name: new FormControl(null),
    category: new FormControl(null),
    subcategory: new FormControl(null),
    price: new FormControl(null),
    quantity: new FormControl(null)
  })

  constructor(private _AuthService: AuthService, private _ProductsService: ProductsService, private _CategoriesService: CategoriesService,
    private _SubcategoriesService:SubcategoriesService, private _Router: Router, private _ActivatedRoute: ActivatedRoute) { }

  loadProduct(productId: string) {
    this.subscription = this._ProductsService.getProduct(productId).subscribe({
      next: (res) => {
        this.product = res.data;
      },
      error: (err) => {
        this.productError = err.error.message;
      }
    })
  }

  onCategoryChange(event: Event) {
    const target = event.target as HTMLSelectElement; // Type assertion to ensure target is not null
    const categoryId = target.value;
    this.getSpecificSubcategories(categoryId);
  }

  getAllCategories() {
    this.subscriptionCategories = this._CategoriesService.getCategories(200, undefined, 'name', '').subscribe({
      next: (res) => {
        this.categories = res.data;
      }
    })
  }

  getSpecificSubcategories(categoryId: string) {
    this.subscriptionSubcategories = this._SubcategoriesService.getSpecificSubcategories(categoryId, 200, 'name').subscribe({
      next: (res) => {
        this.subcategories = res.data;
      }
    })
  }

  updateProduct(productId: string, formData: FormGroup) {
    this._ProductsService.updateProduct(productId, formData.value).subscribe({
      next: (res) => {
        alert('Product updated');
        this._Router.navigate(['/products']);
      },
      error: (err) => { this.productError = err.error.errors[0].msg }
    })
  }

  ngOnInit(): void {
    this._AuthService.checkToken();
    this.id = this._ActivatedRoute.snapshot.params['id'];
    this.loadProduct(this.id);
    this.getAllCategories();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.subscriptionSubcategories.unsubscribe();
    this.subscriptionCategories.unsubscribe();
  }

}
