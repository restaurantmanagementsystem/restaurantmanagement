import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  User: boolean = false;
  FoodItem: boolean = false;
  Dashboard: boolean = false;
  constructor() { }
  dashboard() {
    this.Dashboard = true;
    this.FoodItem = false;
    this.User = false;

  }
  manageFoodItem() {
    this.Dashboard = false;
    this.FoodItem = true;
    this.User = false;
  }
  manageUser() {
    this.Dashboard = false;
    this.FoodItem = false;
    this.User = true;
  }

  ngOnInit(): void {
  }

}
