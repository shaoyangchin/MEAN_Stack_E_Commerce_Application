import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category, CategoriesService } from '@munch/products';

@Component({
  selector: 'admin-products-form',
  templateUrl: './products-form.component.html',
  styles: [],
})
export class ProductsFormComponent implements OnInit {
  editMode: false;
  form: FormGroup;
  isSubmitted: false;
  categories : Category[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this._initForm();
    this._getCategories();
  }

  private _initForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      brand: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      countInStock: ['', Validators.required],
      description: ['', Validators.required],
      richDescription: [''],
      image: [''],
      isFeatured: [''],
    });
  }

  private _getCategories() {this.categoriesService.getCategories().subscribe(categories => {
    this.categories = categories;
  })}

  get productForm() {
    return this.form.controls;
  }

  // onSubmit() {
  //   this.isSubmitted = true;
  //   if (this.form.invalid) {
  //     return;
  //   }
  //   const product: Product = {
  //     id: this.currentProductId,
  //     name: this.productForm.name.value,
  //     icon: this.productForm.icon.value,
  //     color: this.productForm.color.value
  //   };
  //   if (this.editMode) {
  //     this._updateProduct(product);
  //   } else {
  //     this._addProduct(product);
  //   }
  // }

  onCancel() {
    this.location.back();
  }
}
