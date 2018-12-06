import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductsService } from '../products.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Category } from '../category';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {

  productForm: FormGroup;
  productId = null;
  name = '';
  description = '';
  url = '';
  categories = [];
  categoryList = [];
  isLoadingResults = false;

  constructor(private router: Router, private route: ActivatedRoute,
    private productsService: ProductsService, private formBuilder: FormBuilder) { }

    ngOnInit() {
      this.getProduct(this.route.snapshot.params['id']);
      this.productForm = this.formBuilder.group({
        'name' : [null, Validators.required],
        'description' : [null, Validators.maxLength(200)],
        'url' : [null, Validators.maxLength(500)],
        'categoryIds': []
      });
      this.productsService.getCategories().subscribe(res => {
        this.categoryList = res;
      });
    }

    getProduct(id) {
      this.productsService.getProduct(id).subscribe(data => {
        this.productId = data.ProductId;
        console.log(data);
        this.productForm.setValue({
          name: data.Name,
          description: data.Description,
          url: data.Url,
          categoryIds: data.Categories
        });
      });
    }

    onFormSubmit(form: NgForm) {
      this.isLoadingResults = true;
      this.productsService.updateProduct(this.productId, form)
        .subscribe(res => {
            this.isLoadingResults = false;
            this.router.navigate(['/product-details', this.productId]);
          }, (err) => {
            console.log(err);
            this.isLoadingResults = false;
          }
        );
    }

    productDetails() {
      this.router.navigate(['/product-details', this.productId]);
    }

    compareFn(c1: Category, c2: Category): boolean {
      return c1 && c2 ? c1.CategoryId === c2.CategoryId : c1 === c2;
    }
}
