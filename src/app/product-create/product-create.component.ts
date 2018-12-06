import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../products.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss']
})
export class ProductCreateComponent implements OnInit {

  productForm: FormGroup;
  name = '';
  description = '';
  url = '';
  categories = [];
  categoryList = [];
  isLoadingResults = false;

  constructor(private router: Router, private productsService: ProductsService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.productForm = this.formBuilder.group({
      'name' : [null, Validators.required],
      'description' : [null, Validators.maxLength(200)],
      'url' : [null, Validators.maxLength(500)],
      'categoryIds': []
    });

    this.productsService.getCategories().subscribe(res => {
      this.categoryList = res;
      this.productForm.controls.categoryIds.setValue(this.categoryList);
    });
  }

  onFormSubmit(form: NgForm) {
    this.isLoadingResults = true;
    this.productsService.createProduct(form)
      .subscribe(res => {
          this.isLoadingResults = false;
          this.router.navigate(['/products']);
        }, (err) => {
          this.isLoadingResults = false;
        });
  }

}
