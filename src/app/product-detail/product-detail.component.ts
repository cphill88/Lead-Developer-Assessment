import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../products.service';
import { Product } from '../product';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  product: Product = { ProductId: null, Name: '', Description: '', Url: '', Categories: [] };
  isLoadingResults = true;

  constructor(private route: ActivatedRoute, private productsService: ProductsService, private router: Router) { }

  ngOnInit() {
    this.getProductDetails(this.route.snapshot.params['id']);
  }

  getProductDetails(id) {
    this.productsService.getProduct(id)
      .subscribe(data => {
        this.product = data;
        this.isLoadingResults = false;
      });
  }

}
