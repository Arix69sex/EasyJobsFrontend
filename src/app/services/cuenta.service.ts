import { Injectable } from '@angular/core';
import {catchError, retry} from "rxjs/operators";
import {HttpDataService} from "./http-data.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TokenService} from "./token.service";
import {Cuenta} from "../models/cuenta";
import jwtDecode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class CuentaService {
  private http: HttpClient;
  private httpOptions: any;
  private handleError: any;
  private basePath: any;
  private currentUser: number = null;

  constructor(private httpDataService: HttpDataService,
              private tokenService: TokenService) {
    this.http = httpDataService.http;
    // this.basePath =  'https://easy-jobs-backend.herokuapp.com/swagger-ui/index.html?configUrl=/easyJobs-api-docs/swagger-config#/cuentas';
    this.basePath = 'http://localhost:8080/swagger-ui/index.html?configUrl=/easyJobs-api-docs/swagger-config#/cuentas';
    this.httpOptions = httpDataService.httpOptions;
  }

  createItem(item: any): Observable<Cuenta> {
    return this.http.post<Cuenta>(`${this.basePath}`, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  getItem(id: any): Observable<Cuenta> {
    return this.http.get<Cuenta>(`${this.basePath}/${id}`, this.httpOptions )
      .pipe(retry(2), catchError(this.handleError));
  }

  getList(): Observable<Cuenta>{
    return this.http.get<Cuenta>(`${this.basePath}`)
      .pipe(retry(2), catchError(this.handleError));
  }

  updateItem(id: any, item: any): Observable<Cuenta>{
    return this.http.put<Cuenta>(`${this.basePath}/${id}`, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  deleteItem(id: any): Observable<any> {
    return this.http.delete<Cuenta>(`${this.basePath}/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  setCurrentUser(id: number): void{
    this.currentUser = id;
  }

  getCurrentUser(): number{
    let token = this.tokenService.getToken();
    if (token !== null) {
      let decoded = jwtDecode(token);
    }
    let decoded = jwtDecode(token);
    // @ts-ignore
    return decoded.sub;
  }

  clearCurrentUser(): void {
    this.currentUser = null;
  }
}
