import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { Product } from '../product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  displayedColumns: string[] = ['name', 'description'];
  data: Product[] = [];
  isLoadingResults = true;

  constructor(private productsService: ProductsService) { }

  ngOnInit() {
    this.productsService.getProducts()
      .subscribe(res => {
        this.data = res;
        this.isLoadingResults = false;
      }, err => {
        this.isLoadingResults = false;
      });
  }

}
