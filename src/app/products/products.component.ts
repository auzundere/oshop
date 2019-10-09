import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from '../product.service';
import {ActivatedRoute} from '@angular/router';
import {Product} from '../models/product';
import 'rxjs-compat/add/operator/switchMap';
import {ShoppingCartService} from '../shopping-cart.service';
import {Observable, Subscription} from 'rxjs';
import {ShoppingCart} from '../models/shopping-cart';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {

  products: Product[] = [];
  filteredProducts: Product[];
  category: string;
  cart$: any;
  subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService
  ) {

  }

  async ngOnInit() {
    this.subscription = (await this.shoppingCartService.getCart())
      .subscribe(cart => this.cart$ = cart);
    this.populateProducts();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private applyFilter() {
    this.filteredProducts = (this.category) ?
      this.products.filter(p => p.category === this.category) :
      this.products;
  }

  private populateProducts() {
    this.productService.getAll()
      .switchMap((products: Product[]) => {
        this.products = products;
        return this.route.queryParamMap;
      })

      .subscribe(params => {
        this.category = params.get('category');
        this.applyFilter();
      });
  }
}
