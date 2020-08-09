import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user-model';
import { Product } from '../models/product-model';
@Injectable({
  providedIn: 'root'
})
export class AppService {
  http: HttpClient = null;
  user: User;
  constructor(http: HttpClient) {
    this.http = http;
  }

  createUser(user: User) {
    return this.http.post('http://localhost:3000/api/v1/user/', user);
  }

  addFoodItem(product: Product) {
    return this.http.post('http://localhost:3000/api/v1/fooditem/', product);
  }
}
