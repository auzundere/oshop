import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireObject} from 'angularfire2/database';
import {Product} from './models/product';
import {map, take} from 'rxjs/operators';
import 'rxjs-compat/add/operator/take';
import {ShoppingCart} from './models/shopping-cart';
import {Observable} from 'rxjs';
import {ShoppingCartItem} from './models/shopping-cart-item';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) {
  }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId).valueChanges()
      .pipe(map(({items}) => new ShoppingCart(items)));
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem('cartId');
    if (cartId) {
      return cartId;
    }

    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  async addToCart(product: Product) {
    this.updateItem(product, 1);
  }

  async removeFromCart(product: Product) {
    if(product.quantity === 1) {
      let cartId = await this.getOrCreateCartId();
      this.db.object('/shopping-carts/' + cartId + '/items/'+ product.key ).remove();
      return;
    }
    this.updateItem(product, -1);
  }

  async clearCart() {

  }


  private async updateItem(product: Product, change: number) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.key);
    item$.snapshotChanges().pipe(take(1)).subscribe(item => {
      item$.update({
        title: product.title,
        imageUrl: product.imageUrl,
        price: product.price,
        quantity: item.payload.exists() ?
          item.payload.exportVal().quantity + change : change
      });
    });
  }
}
