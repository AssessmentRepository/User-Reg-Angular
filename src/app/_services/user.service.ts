import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from "@angular/http";
import { map } from 'rxjs/operators';

const httpOptions = {
  headers: new Headers({ "Content-Type": "application/json" })
};

@Injectable({ providedIn: 'root' })
export class UserService {

    public static BaseUrl = "http://localhost:4444/";

    constructor(private http: Http) { }
    postUserRegistrationdata(data){
      return this.http.post(UserService.BaseUrl+'userregistration',data,httpOptions).pipe(map((response: Response) => response.json()));
    }
    getUserRegistrationdata() {
      return this.http.get(UserService.BaseUrl+'userregistration',httpOptions).pipe(map((response: Response) => response.json()));
    }
}