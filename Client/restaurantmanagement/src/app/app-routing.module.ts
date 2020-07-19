import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddUsersComponent } from './admin-support/add-users/add-users.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'add-user', component: AddUsersComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
