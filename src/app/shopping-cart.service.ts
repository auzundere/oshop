import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireObject} from 'angularfire2/database';
import {Product} from './models/product';
import {map, take} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {ShoppingCart} from './models/shopping-cart';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) {
  }

  async getCart():Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    let cartItems = this.db.object('/shopping-carts/' + cartId);
    return cartItems.snapshotChanges()
      .pipe(map(x => new ShoppingCart(x.payload.exportVal().items)));
  }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }



  private getItem (cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  async addToCart(product: Product) {
    this.updateItem(product, 1);
  }

  async removeFromCart(product: Product) {
    this.updateItem(product, -1);
  }

  private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  async clearCart() {
    let cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }

  private async updateItem(product: Product, change: number){
    let cartId = await this.getOrCreateCartId();
    let items$: Observable<any> = this.getItem(cartId, product.id).valueChanges();
    let item$$ = this.getItem(cartId, product.id);
    items$.pipe(take(1)).subscribe( item => {
      item$$.update({
        title: product.title,
        imageUrl: product.imageUrl,
        price: product.price,
        quantity: (item === null ? 0 : item.quantity) + change
      });
    });
  }

}
