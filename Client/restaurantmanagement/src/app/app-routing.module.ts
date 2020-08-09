import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddUsersComponent } from './admin-support/add-users/add-users.component';
import { AddProductComponent } from './admin-support/add-product/add-product.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'adduser', component: AddUsersComponent },
  { path: 'addFoodItem', component: AddProductComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
