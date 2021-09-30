import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import "tailwindcss/tailwind.css"
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './views/welcome/welcome.component';
import { LoginComponent } from './views/login/login.component';
import { SingupComponent } from './views/singup/singup.component';
import { HomeComponent } from './views/home/home.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    LoginComponent,
    SingupComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
