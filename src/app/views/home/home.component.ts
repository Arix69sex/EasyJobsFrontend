import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Service} from "../../models/service";
import {ServiceService} from "../../services/service.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  serviceData: Service;
  searchForm: FormGroup;

  constructor(private serviceService: ServiceService,
              private formBuilder: FormBuilder,
              private router: Router) {
    this.serviceData = {} as Service;
  }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      searchValue: ['']
    });
    this.getAllServices();
    this.servicesAvailable()
  }

  getAllServices(): void {
    this.serviceService.getList().subscribe((response: any) => {
      console.log(response);
      if (response == null){
        console.log("No Services available :D")
      }
      else{
        this.serviceData = response
      }
    })
  }

  servicesAvailable(): boolean{
    return this.serviceData == null;
  }
}
