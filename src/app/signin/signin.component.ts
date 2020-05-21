import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from "../_services";

export class SigninUser {
  constructor(public username: string, public password: string) {}
}

@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.scss"],
})
export class SigninComponent implements OnInit {
  @Output() signinIn = new EventEmitter<SigninUser>();
  signinForm: FormGroup;
  hide = true;
  userdata;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.getUserRegistration();
    this.signinForm = this.fb.group({
      username: ["", [Validators.required, Validators.minLength(4)]],
      password: ["", [Validators.required, Validators.minLength(8)]],
    });
  }
  getUserRegistration() {
    this.userService.getUserRegistrationdata().subscribe(
      (data) => {
        console.log(
          "LOG: LoginComponent -> onSubmit -> data",
          JSON.stringify(data)
        );
        this.userdata = data;
      },
      (error) => {
        console.log("LOG: LoginComponent -> onSubmit -> error", error);
      }
    );
  }
  onSubmit() {
    this.signinForm.value;
    console.log(
      "LOG: signinComponent -> onSubmit -> this.signinForm.value",
      this.signinForm.value
    );
    if (this.signinForm.valid) {
      this.signinIn.emit(
        new SigninUser(
          this.signinForm.value.username,
          this.signinForm.value.password
        )
      );
    }
    var data = this.signinForm.value;
    var userlogin = this.userdata;
    if(userlogin){
      userlogin.forEach(function (value) {
        if (data.username === value.username) {
          alert("Login successful");
        }
  
        if (data.username !== value.username) {
          alert("Incorrect username or password ");
        }
  
        console.log(value);
      });
    }
    
  }

  signinpage() {
    this.router.navigateByUrl("signin");
  }

  registerpage() {
    this.router.navigateByUrl("register");
  }

  adminpage() {
    this.router.navigateByUrl("admin");
  }
}
