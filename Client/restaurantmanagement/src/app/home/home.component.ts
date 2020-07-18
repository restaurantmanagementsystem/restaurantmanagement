import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  food_items: any[] = [" Chicken Breast ", "  Fresh Grilled Asparagus", "Pork-Stuffed Skins", " Grilled Chicken", " Steak Frites"];
  public menu: {}[] = [];

  constructor() { }

  ngOnInit(): void {

    let menus = document.getElementsByClassName('.list');
    for (let i = 0; i < menus.length; i++) {
      menus[i].innerHTML = "<li>" + this.food_items[0] + "<span>" + "................." + "</span>" + "<b>" + "$19.50" + "</b>" + "</li>"
        + "<li>" + this.food_items[1] + "<span>" + "......" + "</span>" + "<b>" + "$25.00" + "</b>" + "</li>"
        + "<li>" + this.food_items[2] + "<span>" + "............." + "</span>" + "<b>" + "$25.50" + "</b>" + "</li>"
        + "<li>" + this.food_items[3] + "<span>" + "................." + "</span>" + "<b>" + "$25.49" + "</b>" + "</li>"
        + "<li>" + this.food_items[4] + "<span>" + "....................." + "</span>" + "<b>" + "$25.00" + "</b>" + "</li>";
    }

  }

  

}
