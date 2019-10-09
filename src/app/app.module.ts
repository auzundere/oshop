import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {environment} from '../environments/environment';
import {BsNavbarComponent} from './core/bs-navbar/bs-navbar.component';
import {HomeComponent} from './core/home/home.component';
import {ProductsComponent} from './shopping/products/products.component';
import {ShoppingCartComponent} from './shopping/shopping-cart/shopping-cart.component';
import {CheckOutComponent} from './shopping/check-out/check-out.component';
import {OrderSuccessComponent} from './shopping/order-success/order-success.component';
import {MyOrdersComponent} from './shopping/my-orders/my-orders.component';
import {AdminProductsComponent} from './admin/components/admin-products/admin-products.component';
import {AdminOrdersComponent} from './admin/components/admin-orders/admin-orders.component';
import {RouterModule} from '@angular/router';
import {LoginComponent} from './core/login/login.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AuthService} from 'shared/services/auth.service';
import {AuthGuard} from 'shared/services/auth-guard.service';
import {UserService} from 'shared/services/user.service';
import {AdminAuthGuard} from './admin/services/admin-auth-guard.service';
import {ProductFormComponent} from './admin/components/product-form/product-form.component';
import {CategoryService} from 'shared/services/category.service';
import {FormsModule} from '@angular/forms';
import {ProductService} from 'shared/services/product.service';
import {CustomFormsModule} from 'ng2-validation';
import {DataTableModule} from 'angular5-data-table';
import {ProductCardComponent} from './shared/components/product-card/product-card.component';
import {ShoppingCartService} from 'shared/services/shopping-cart.service';
import {ProductQuantityComponent} from './shared/components/product-quantity/product-quantity.component';
import { ProductFilterComponent } from './shopping/products/product-filter/product-filter.component';
import {OrderService} from 'shared/services/order.service';
import { ShoppingCartSummaryComponent } from './shopping/shopping-cart-summary/shopping-cart-summary.component';
import { ShippingFormComponent } from './shopping/shipping-form/shipping-form.component';

// @ts-ignore
@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    LoginComponent,
    ProductFormComponent,
    ProductCardComponent,
    ProductQuantityComponent,
    ProductFilterComponent,
    ShoppingCartSummaryComponent,
    ShippingFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CustomFormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule,
    DataTableModule,
    RouterModule.forRoot([
      {path: '', component: ProductsComponent},
      {path: 'products', component: ProductsComponent},
      {path: 'shopping-cart', component: ShoppingCartComponent},
      {path: 'login', component: LoginComponent},

      {path: 'check-out', component: CheckOutComponent, canActivate: [AuthGuard]},
      {path: 'order-success/:id', component: OrderSuccessComponent, canActivate: [AuthGuard]},
      {path: 'my/orders', component: MyOrdersComponent, canActivate: [AuthGuard]},

      {
        path: 'admin/products/new',
        component: ProductFormComponent,
        canActivate: [AuthGuard, AdminAuthGuard]
      },
      {
        path: 'admin/products/:id',
        component: ProductFormComponent,
        canActivate: [AuthGuard, AdminAuthGuard]
      },
      {
        path: 'admin/products',
        component: AdminProductsComponent,
        canActivate: [AuthGuard, AdminAuthGuard]
      },
      {
        path: 'admin/orders',
        component: AdminOrdersComponent,
        canActivate: [AuthGuard, AdminAuthGuard]
      }
    ])
  ],
  providers: [
    AuthService,
    AuthGuard,
    AdminAuthGuard,
    UserService,
    CategoryService,
    ProductService,
    ShoppingCartService,
    OrderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
