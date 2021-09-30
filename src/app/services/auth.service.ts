import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Cuenta} from "../models/cuenta";

// const AUTH_API = 'https://easy-jobs-backend.herokuapp.com/swagger-ui/index.html?configUrl=/easyJobs-api-docs/swagger-config#/';
const AUTH_API = 'http://localhost:8080/swagger-ui/index.html?configUrl=/easyJobs-api-docs/swagger-config#/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn: boolean;

  constructor(private http: HttpClient) { }

  login(credentials: { email: any; password: any; }): Observable<any> {
    return this.http.post(AUTH_API+ 'cuentas', {
      email: credentials.email,
      password: credentials.password
    }, httpOptions);
  }

  register(cuenta: Cuenta): Observable<any> {
    return this.http.post(AUTH_API + 'cuentas', {
      email: cuenta.email,
      password: cuenta.password,
      tipo: "cliente"
    }, httpOptions);
  }

  loggedInStatus(): boolean{
    return this.isLoggedIn;
  }

  setLoggedInStatus(value: boolean): void {
    this.isLoggedIn = value;
  }
}
