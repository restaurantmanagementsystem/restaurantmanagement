import { Component, OnInit } from '@angular/core';
import { AppService } from "../../services/app.service";
import { Product } from "../../models/product-model";
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  appService: AppService = null;
  myForm: FormGroup;
  types: string[] = ["Veg","NonVeg"];
  categories: string[] = ["Starters", "MainCourse", "Beverages", "Breads", "Deserts"];
  submitted = false;

  constructor(AppService: AppService, private formBuilder: FormBuilder) {
    this.appService = AppService;
}
  get f() { return this.myForm.controls; }

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      name: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      type: new FormControl("", [Validators.required]),
      rate: new FormControl(0, [Validators.required]),
      description: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      category: new FormControl("", [Validators.required])
    });
  }

  addItem() {
    this.submitted = true;
    if (this.myForm.invalid) {
      return;
    }
    let name = this.myForm.get("name").value;
    let type = this.myForm.get("type").value;
    let rate = this.myForm.get("rate").value;
    let description = this.myForm.get("description").value;
    let category = this.myForm.get("category").value;   

    let requestData = new Product(name, type, rate, description, category);

    this.appService.addFoodItem(requestData).subscribe(
      (resp: any) => {           
       
      },
      error => {

      }
    );
  }
  onReset() {
    this.submitted = false;
    this.myForm.controls.type.setValue(" ");
    this.myForm.controls.category.setValue(" ");
    this.myForm.reset();
  }

}
