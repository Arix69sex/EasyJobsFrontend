import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {HttpDataService} from "./http-data.service";
import {catchError, retry} from "rxjs/operators";
import {Observable} from "rxjs";
import {Service} from "../models/service";

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private http: HttpClient;
  private basePath: any;
  private httpOptions: any;
  private handleError: any;

  constructor(private httpDataService: HttpDataService) {
    this.http = httpDataService.http;
    this.basePath = 'http://localhost:8080/';
    this.httpOptions = httpDataService.httpOptions;
  }

  getServiceById(id: any): Observable<Service> {
    return this.http.get<Service>(`${this.basePath}services/${id}`, this.httpOptions )
      .pipe(retry(2), catchError(this.handleError));
  }
  createService(item: any): Observable<Service> {
    return this.http.post<Service>(`${this.basePath}lessors`, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  getList(): Observable<Service>{
    return this.http.get<Service>(`${this.basePath}services`)
      .pipe(retry(2), catchError(this.handleError));
  }
  updateService(id: any, item: any): Observable<Service>{
    return this.http.put<Service>(`${this.basePath}lessors/${id}`, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  deleteService(id: any): Observable<any> {
    return this.http.delete<Service>(`${this.basePath}lessors/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}
