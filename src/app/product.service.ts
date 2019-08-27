import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Observable} from 'rxjs';
import {Product} from './models/product';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) {
  }

  create(product) {
    this.db.list('/products').push(product);
  }

  getAllObservable() {
    return this.db.list('/products').snapshotChanges();
  }

  getAll(): Observable<Product[]> {
    return this.db.list<Product>('/products')
      .snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c => {
            const data = c.payload.val() as Product;
            const id = c.payload.key;
            return {id, ...data};
          })
        )
      );
  }

  get(productId): Observable<Product> {
    return this.db.object('/products/' + productId)
      .snapshotChanges().pipe(map(p => p.payload.val() as Product));
  }


  update(productId, product) {
    return this.db.object('/products/' + productId).update(product);
  }

  delete(productId) {
    return this.db.object('/products/' + productId).remove();
  }

}
