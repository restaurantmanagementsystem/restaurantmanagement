import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { AppService } from "../../services/app.service";
import { Login } from '../../models/login';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  iconvisible: boolean = true;
  returnUrl: string;
  router: Router = null;
  appService: AppService = null;

  constructor(AppService: AppService,private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    router: Router,
  ) {
    this.appService = AppService;
    this.router = router;

    // redirect to home if already logged in   
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);

    this.loginForm = new FormGroup({
      username: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required])
    });


    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';
  }

  ngOnDestroy(): void {
    //  clean up
  }

  passwordView() {
    let password = <HTMLFormElement>document.getElementById("myInput");
    if (password.type === "password") {
      password.type = "text";
    } else {
      password.type = "password";
    }
    this.iconvisible = false;
  }

  passwordHide() {
    let password = <HTMLFormElement>document.getElementById("myInput");
    if (password.type === "text") {
      password.type = "password";
    } else {
      password.type = "text";
    }
    this.iconvisible = true;
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    let email = this.loginForm.get("username").value;
    let password = this.loginForm.get("password").value;

    let requestData = new Login(email, password);

    this.appService.loginUser(requestData).subscribe(
      (resp: any) => {
        let user = resp.user;
        this.router.navigate([user.home]);
      },
      error => {
        console.log(error);
      }
    );
  }

}
