import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, retry} from "rxjs/operators";
import {HttpDataService} from "./http-data.service";
import {User} from "../models/user";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private http: HttpClient;
  private basePath: any;
  private httpOptions: any;
  private handleError: any;

  constructor(private httpDataService: HttpDataService) {
    this.http = httpDataService.http;
    this.basePath = 'http://localhost:8080/users';
    this.httpOptions = httpDataService.httpOptions;
  }

  // Create User
  createItem(item: any): Observable<User> {
    console.log(item);
    return this.http.post<User>(`${this.basePath}`, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Get User by Id
  getItem(id: any): Observable<User> {
    return this.http.get<User>(`${this.basePath}/${id}`, this.httpOptions )
      .pipe(retry(2), catchError(this.handleError));
  }
  // Get User Data
  getList(): Observable<User>{
    return this.http.get<User>(`${this.basePath}`)
      .pipe(retry(2), catchError(this.handleError));
  }
}
