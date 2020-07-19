export class User {
  name: String;   
  foodType: String;
  rate: number;
  description: String;
  category: String;
  constructor(name: String,   
    foodType: String,
    rate: number,
    description: String,
    category: String) {
    this.name = name;
    this.foodType = foodType;
    this.rate = rate;
    this.description = description;
    this.category = category;
  }
}
