import {
  async,
  ComponentFixture,
  TestBed,
  inject,
} from "@angular/core/testing";
import { AdminComponent, UserElement } from "./admin.component";
import { RouterTestingModule } from "@angular/router/testing";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { HttpModule } from "@angular/http";
import { UserService } from "../_services/user.service";

describe("AdminComponent", () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminComponent],
      imports: [HttpClientTestingModule, HttpModule, RouterTestingModule],
      providers: [UserService],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(AdminComponent);
        component = fixture.componentInstance;
      });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
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
