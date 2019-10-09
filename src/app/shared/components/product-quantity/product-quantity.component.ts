import {Component, Input, OnInit} from '@angular/core';
import {Product} from 'shared/models/product';
import {ShoppingCartService} from 'shared/services/shopping-cart.service';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent implements OnInit{
  @Input('product') product: Product;
  @Input('shopping-cart') shoppingCart;
  cart$;

  constructor(private cartService: ShoppingCartService) {
  }

  addToCart() {
    this.cartService.addToCart(this.product);
  }

  removeFromCart() {
    this.cartService.removeFromCart(this.product);
  }

  async ngOnInit() {
    this.cart$ = await this.cartService.getCart();
  }


}
