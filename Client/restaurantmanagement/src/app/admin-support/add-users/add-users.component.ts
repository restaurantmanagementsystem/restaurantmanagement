import { Component, OnInit } from '@angular/core';
import { AppService } from "../../services/app.service";
import { User } from "../../models/user-model";
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.css']
})
export class AddUsersComponent implements OnInit {
  appService: AppService = null;
  myForm: FormGroup;
  roles: string[] = ["Admin", "Cheif", "Manager", "Waiter"];
  statues: string[] = ["Active", "InActive"]

  constructor(AppService: AppService, private formBuilder: FormBuilder) {
    this.appService = AppService;
  }
  get f() { return this.myForm.controls; }

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      firstName: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      lastName: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      username: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      email: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      password: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      phone: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      status: new FormControl("", [Validators.required]),
      role: new FormControl("", [Validators.required])
    });
  }


  onSubmitRegistration() {
    let firstName = this.myForm.get("firstName").value;
    let lastName = this.myForm.get("lastName").value;
    let username = this.myForm.get("username").value;
    let email = this.myForm.get("email").value;
    let password = this.myForm.get("password").value;
    let phone = this.myForm.get("phone").value;
    let status = this.myForm.get("status").value;
    let role = this.myForm.get("role").value;

    let requestData = new User(firstName, lastName, username, email, password, phone, status, role);

    this.appService.createUser(requestData).subscribe(
      (resp: any) => {
       
      },
      error => {
       
      }
    );
  }


}
