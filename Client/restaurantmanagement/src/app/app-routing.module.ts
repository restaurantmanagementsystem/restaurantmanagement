import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddUsersComponent } from './admin-support/add-users/add-users.component';
import { AddProductComponent } from './admin-support/add-product/add-product.component';
import { AdminHomeComponent } from './admin-support/admin-home/admin-home.component';
import { AdminLoginComponent } from './admin-support/admin-login/admin-login.component';
import { AdminDashboardComponent } from './admin-support/admin-dashboard/admin-dashboard.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'adduser', component: AddUsersComponent },
  { path: 'addFoodItem', component: AddProductComponent },
  { path: 'adminHome', component: AdminHomeComponent },
  { path: 'adminLogin', component: AdminLoginComponent },
  { path: 'adminDashboard', component: AdminDashboardComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
