import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

const AUTH_API = 'http://localhost:8080/';
const httpOptions = {
  headers: new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Access-Control-Allow-Origin', '*')
    .set('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn: boolean;

  constructor(private http: HttpClient) { }

  login(credentials: { email: any; password: any; }): Observable<any> {
    return this.http.post(AUTH_API+ 'users', {
      email: credentials.email,
      password: credentials.password
    }, httpOptions);
  }

  register(item: any): Observable<any> {
    return this.http.post(AUTH_API + 'users', JSON.stringify({
      email: item.email,
      password: item.password,
      tipoCuenta: item.tipoCuenta
    }), httpOptions);
  }

  loggedInStatus(): boolean{
    return this.isLoggedIn;
  }

  setLoggedInStatus(value: boolean): void {
    this.isLoggedIn = value;
  }

  getAuthAPI(): string {
    return AUTH_API;
  }
}
