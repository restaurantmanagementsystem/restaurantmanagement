import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';  
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { OrderDashboardComponent } from './order-dashboard/order-dashboard.component';
import { HomeComponent } from './home/home.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ViewProductsComponent } from './view-products/view-products.component';
import { AddProductComponent } from './admin-support/add-product/add-product.component';
import { AddUsersComponent } from './admin-support/add-users/add-users.component';
import { AdminLoginComponent } from './admin-support/admin-login/admin-login.component';
import { ProductCartComponent } from './product-cart/product-cart.component';
import { NotFoundErrorComponent } from './not-found-error/not-found-error.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminHomeComponent } from './admin-support/admin-home/admin-home.component';
import { AdminDashboardComponent } from './admin-support/admin-dashboard/admin-dashboard.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    OrderDashboardComponent,
    HomeComponent,
    ProductDetailsComponent,
    ViewProductsComponent,
    AddProductComponent,
    AddUsersComponent,
    AdminLoginComponent,
    ProductCartComponent,
    NotFoundErrorComponent,
    AdminHomeComponent,
    AdminDashboardComponent
  ],
  imports: [FormsModule, ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule, NgbModule  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
