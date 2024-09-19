import { Component, OnDestroy, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ProductsService } from '../services/products.service';
import { CategoriesService } from '../services/categories.service';
import { SubcategoriesService } from '../services/subcategories.service';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent implements OnInit, OnDestroy {
  categoriesSubscription: any;
  subcategoriesSubscription: any;
  categories: any[] = [];
  subcategories: any[] = [];
  getName: string = '';
  getDescription: string = '';
  getPrice: string = '0';
  getQuantity: string = '0';
  getCategory: string = '';
  getSubcategory: string = '';
  productCover: any;
  productImages: any[] = [];
  setCover(event: any) {
    const cover = event.target.files[0]
    if (cover) { this.productCover = cover };
  }
  setImages(event: any) {
    const images = event.target.files;
    if (images) { this.productImages = images };
  }
  constructor(private _AuthService: AuthService, private _ProductsService: ProductsService, private _CategoriesService: CategoriesService,
    private _SubcategoriesService: SubcategoriesService, private _Router: Router
  ) { }

  loadCategories() {
    this.categoriesSubscription = this._CategoriesService.getCategories(200, 1, 'name', '').subscribe({
      next: (res) => {
        this.categories = res.data;
      }, error: (err) => { }
    })
  }

  loadSubcategories(categoryId: string) {
    this.getCategory = categoryId;
    this.subcategoriesSubscription = this._SubcategoriesService.getSpecificSubcategories(categoryId, 200, 'name').subscribe({
      next: (res) => {
        this.subcategories = res.data;
      }
    })
  }

  createProduct() {
    const formData = new FormData();
    formData.append('name', this.getName);
    formData.append('description', this.getDescription);
    formData.append('category', this.getCategory);
    formData.append('subcategory', this.getSubcategory);
    formData.append('price', this.getPrice);
    formData.append('quantity', this.getQuantity);
    if (this.productCover) {
      formData.append('cover', this.productCover);
    };
    // if (this.productImages) {
    //   formData.append('images', this.productImages);
    // };
    // TODO: fix upload images
    if (this.productImages && this.productImages.length > 0) {
      for (let i = 0; i < this.productImages.length; i++) {
        formData.append('images', this.productImages[i]);
      }
    }
    this._ProductsService.createProduct(formData).subscribe({
      next: (res) => {
        alert('product added successfully');
        this._Router.navigate(['/products']);
      }
    })
  }

  ngOnInit(): void {
    this._AuthService.checkToken()
    this.loadCategories();
  }

  ngOnDestroy(): void {
    this.categoriesSubscription.unsubscribe();
    if (this.subcategoriesSubscription) {
      this.subcategoriesSubscription.unsubscribe();
    }
  }
}
