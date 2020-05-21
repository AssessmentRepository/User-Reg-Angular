import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ChangeDetectorRef,
} from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from "../_services";
export class RegisterUser {
  constructor(
    public username: string,
    public password: string,
    public repeatpassword: string,
    public email: string,
    public profilepic:string
  ) {}
}

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  @Output() registerIn = new EventEmitter<RegisterUser>();
  registerForm: FormGroup;
  hide = true;
  userData;
  public obj: any = {};

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private cd: ChangeDetectorRef, private userService: UserService
  ) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      username: ["", [Validators.required, Validators.minLength(4)]],
      password: ["", [Validators.required, Validators.minLength(8)]],
      repeatpassword: ["", [Validators.required, Validators.minLength(8)]],
      email: ["", [Validators.required, Validators.pattern("[^ @]*@[^ @]*")]],
      profilepic: [null, [Validators.required]],
    });
  }

  onFileChange(event) {
    console.log("LOG: RegisterComponent -> onFileChange -> event", event);
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      var profilepic = event.target.files[0].name;
      console.log("LOG: RegisterComponent -> onFileChange -> profilepic", profilepic)

      reader.onload = () => {
        this.registerForm.patchValue({
          profilepic: profilepic,
        });
      
        this.cd.markForCheck();
      };
    }
  }

  onSubmit() {
    this.obj = { ...this.registerForm.value, ...this.obj };
    this.registerForm.value;
    console.log(
      "LOG: LoginComponent -> onSubmit -> this.registerForm.value",
      this.registerForm.value
    );
    if (
      this.registerForm.value.password == this.registerForm.value.repeatpassword
    ) {
      if (this.registerForm.valid) {
        this.registerIn.emit(
          new RegisterUser(
            this.registerForm.value.username,
            this.registerForm.value.password,
            this.registerForm.value.repeatpassword,
            this.registerForm.value.email,
            this.registerForm.value.profilepic
          )
        );
      }
    }

    
    var data = this.registerForm.value;
    this.userService.postUserRegistrationdata(data).subscribe(
      data => {
        console.log(
          "LOG: LoginComponent -> onSubmit -> data",
          JSON.stringify(data)
        );
        this.userData = data;
      },
      error => {
        console.log("LOG: LoginComponent -> onSubmit -> error", error);
      }
    );
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
