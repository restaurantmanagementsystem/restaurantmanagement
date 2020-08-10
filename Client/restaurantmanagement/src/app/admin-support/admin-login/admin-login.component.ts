import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
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

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    router: Router,
  ) {
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
     this.router.navigate(['/adminHome']);

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    let email = this.loginForm.get("username").value;
    let password = this.loginForm.get("password").value;

    //this.authenticationService.login(email, password)
    //  .pipe(first())
    //  .subscribe(
    //    (resp: any) => {
    //      if (resp) {
    //        if (this.returnUrl.length > 0)
    //          this.router.navigate([this.returnUrl]);
    //        else
    //          this.router.navigate([resp.home]);
    //      }
    //    },
    //    (error) => {
    //      this.notification.create(
    //        'warning',
    //        'login',
    //        'Please enter correct credentials',
    //      );
    //    },
    //    () => {
    //    }
    //  );
  }

}
