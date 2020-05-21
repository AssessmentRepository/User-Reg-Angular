import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from "@angular/router";
import { UserService } from '../_services';

export interface UserElement {
  username: string;
  profilepic:any,
  slno: number;
  password: any;
  email: string;
  repeatpassword:any;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})

export class AdminComponent implements OnInit {
  editdata :boolean = false;
  displayedColumns: string[] = ['slno', 'profilepic', 'username', 'password','email','action'];
  dataSource;

  constructor(private router: Router,private userService: UserService) { }
  ngOnInit() {
    this.getUserRegistration();
 }
 
 getUserRegistration() {
   this.userService.getUserRegistrationdata().subscribe(
     data => {
       console.log(
         "LOG: LoginComponent -> onSubmit -> data",
         JSON.stringify(data)
       );
        this.dataSource = new MatTableDataSource<UserElement>(data);
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
