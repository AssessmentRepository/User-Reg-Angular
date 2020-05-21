import {
  async,
  ComponentFixture,
  TestBed,
  inject,
} from "@angular/core/testing";
import { RegisterComponent, RegisterUser } from "./register.component";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { HttpModule } from "@angular/http";
import { UserService } from "../_services/user.service";

describe("RegisterComponent", () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        HttpModule,
        RouterTestingModule,
      ],
      providers: [UserService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create toBeTruthy()", () => {
    expect(component).toBeTruthy();
  });

  it("form invalid when empty toBeFalsy()", () => {
    expect(component.registerForm.valid).toBeFalsy();
  });

  it("user name field validation toBeFalsy() toBeTruthy() ", () => {
    let errors = {};
    let username = component.registerForm.controls["username"];
    expect(username.valid).toBeFalsy();

    // Username field is required
    errors = username.errors || {};
    expect(errors["required"]).toBeTruthy();

    // Set username to something
    username.setValue("tes");
    errors = username.errors || {};
    expect(errors["required"]).toBeFalsy();
    expect(errors["minlength"]).toBeTruthy();

    // Set username to something correct
    username.setValue("testname");
    errors = username.errors || {};
    expect(errors["required"]).toBeFalsy();
  });

  it("password field validation .toBeFalsy() .toBeTruthy()", () => {
    let errors = {};
    let password = component.registerForm.controls["password"];
    expect(password.valid).toBeFalsy();
    // Password field is required
    errors = password.errors || {};
    expect(errors["required"]).toBeTruthy();

    // Set password to something
    password.setValue("123456");
    errors = password.errors || {};
    expect(errors["required"]).toBeFalsy();
    expect(errors["minlength"]).toBeTruthy();

    // Set password to something correct
    password.setValue("Abc12345");
    errors = password.errors || {};
    expect(errors["required"]).toBeFalsy();
    expect(errors["minlength"]).toBeFalsy();
  });

  it("repeatpassword field validation .toBeFalsy() .toBeTruthy()", () => {
    let errors = {};
    let repeatpassword = component.registerForm.controls["repeatpassword"];
    expect(repeatpassword.valid).toBeFalsy();
    // Repeatpassword field is required
    errors = repeatpassword.errors || {};
    expect(errors["required"]).toBeTruthy();

    // Set repeatpassword to something
    repeatpassword.setValue("123456");
    errors = repeatpassword.errors || {};
    expect(errors["required"]).toBeFalsy();
    expect(errors["minlength"]).toBeTruthy();

    // Set repeatpassword to something correct
    repeatpassword.setValue("Abc12345");
    errors = repeatpassword.errors || {};
    expect(errors["required"]).toBeFalsy();
    expect(errors["minlength"]).toBeFalsy();
  });

  it("email field validity .toBeFalsy() .toBeTruthy()", () => {
    let errors = {};
    let email = component.registerForm.controls["email"];
    expect(email.valid).toBeFalsy();

    // Email field is required
    errors = email.errors || {};
    expect(errors["required"]).toBeTruthy();

    // Set email to something
    email.setValue("testname");
    errors = email.errors || {};
    expect(errors["required"]).toBeFalsy();
    expect(errors["pattern"]).toBeTruthy();

    // Set email to something correct
    email.setValue("test@example.com");
    errors = email.errors || {};
    expect(errors["required"]).toBeFalsy();
    expect(errors["pattern"]).toBeFalsy();
  });

  it("submitting a form emits a user toBeTruthy() toBeFalsy() toBe()", () => {
    expect(component.registerForm.valid).toBeFalsy();
    component.registerForm.controls["username"].setValue("testname");
    component.registerForm.controls["password"].setValue("Abc12345");
    component.registerForm.controls["repeatpassword"].setValue("Abc12345");
    component.registerForm.controls["email"].setValue("test@example.com");
    component.registerForm.controls["profilepic"].setValue("test.png");
    expect(component.registerForm.valid).toBeTruthy();

    let registerUser: RegisterUser;
    // Subscribe to the Observable and store the user in a local variable.
    component.registerIn.subscribe((value) => (registerUser = value));

    // Trigger the signin function
    component.onSubmit();

    // Now we can check to make sure the emitted value is correct
    expect(registerUser.username).toBe("testname");
    expect(registerUser.password).toBe("Abc12345");
    expect(registerUser.repeatpassword).toBe("Abc12345");
    expect(registerUser.email).toBe("test@example.com");
    expect(registerUser.profilepic).toBe("test.png");
  });
  it("should be User register", inject(
    [HttpTestingController, UserService],
    (httpMock: HttpTestingController, dataService: UserService) => {
      var localdata = {
        username: "testname",
        password: "Abc12345",
        repeatpassword: "12345678",
        email: "test@example.com",
        profilepic: "test.png",
      };
      dataService.postUserRegistrationdata(localdata).subscribe((data) => {
        expect(data).toEqual(localdata);
      });
    }
  ));
});
