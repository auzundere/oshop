import {Component, OnDestroy} from '@angular/core';
import {ProductService} from '../product.service';
import {ActivatedRoute} from '@angular/router';
import {Product} from '../models/product';
import {switchMap} from 'rxjs/operators';
import {ShoppingCartService} from '../shopping-cart.service';
import {Subscription} from 'rxjs';
import {CategoryService} from '../category.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  product$;
  categories$;

  constructor(
    categoryService: CategoryService,
    productService: ProductService) {
    this.product$ = productService.getAll();
    this.categories$ = categoryService.getCategories();
  }
}
