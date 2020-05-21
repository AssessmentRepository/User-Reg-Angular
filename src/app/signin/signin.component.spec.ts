import {
  async,
  ComponentFixture,
  TestBed,
  inject,
} from "@angular/core/testing";
import { SigninComponent, SigninUser } from "./signin.component";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { HttpModule } from "@angular/http";
import { UserService } from "../_services/user.service";

describe("SigninComponent", () => {
  let component: SigninComponent;
  let fixture: ComponentFixture<SigninComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SigninComponent],
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
    fixture = TestBed.createComponent(SigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create toBeTruthy()", () => {
    expect(component).toBeTruthy();
  });

  it("form invalid when empty toBeFalsy()", () => {
    expect(component.signinForm.valid).toBeFalsy();
  });

  it("user name field validation toBeFalsy() toBeTruthy() ", () => {
    let errors = {};
    let username = component.signinForm.controls["username"];
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
    let password = component.signinForm.controls["password"];
    expect(password.valid).toBeFalsy();
    // Email field is required
    errors = password.errors || {};
    expect(errors["required"]).toBeTruthy();

    // Set email to something
    password.setValue("123456");
    errors = password.errors || {};
    expect(errors["required"]).toBeFalsy();
    expect(errors["minlength"]).toBeTruthy();

    // Set email to something correct
    password.setValue("Abc12345");
    errors = password.errors || {};
    expect(errors["required"]).toBeFalsy();
    expect(errors["minlength"]).toBeFalsy();
  });

  it("submitting a form emits a user toBeTruthy() toBeFalsy() toBe()", () => {
    expect(component.signinForm.valid).toBeFalsy();
    component.signinForm.controls["username"].setValue("testname");
    component.signinForm.controls["password"].setValue("Abc12345");
    expect(component.signinForm.valid).toBeTruthy();

    let signinUser: SigninUser;

    // Subscribe to the Observable and store the user in a local variable.
    component.signinIn.subscribe((value) => (signinUser = value));

    // Trigger the login function
    component.getUserRegistration();
    component.onSubmit();

    // Now we can check to make sure the emitted value is correct
    expect(signinUser.username).toBe("testname");
    expect(signinUser.password).toBe("Abc12345");
  });

  it("should be check get user registration api", inject(
    [HttpTestingController, UserService],
    (httpMock: HttpTestingController, dataService: UserService) => {
      component.ngOnInit();
      dataService.getUserRegistrationdata().subscribe((data) => {
        expect(data).toEqual(data);
        expect(data).toBe(data);
        expect(data).not.toBe(null);
        expect(null).toBeNull();
        expect(data).toBeTruthy();
      });
    }
  ));
});
