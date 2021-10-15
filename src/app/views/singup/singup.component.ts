import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {TokenService} from "../../services/token.service";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})
export class SingupComponent implements OnInit {
  signupForm: FormGroup;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  token: string = '';

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private userService: UserService,
              private authService: AuthService,
              private tokenService: TokenService
              ) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  submitForm(): void {
    console.log(this.signupForm)
    if (this.signupForm.invalid) {
      console.log("Invalid form, try again :).")
      return;
    }
    console.log(this.signupForm.value);
    this.authService.register(this.signupForm.value).subscribe(
      data => {
        this.tokenService.saveToken(data.accessToken)
        return this.router.navigate(['/home']).then(() => {
          window.location.reload();
        });
      },
      error => {
        this.errorMessage = error.error.errorMessage;
        this.isLoginFailed = true;
        this.isLoggedIn = false;
      }
    );
  }
  cancelForm(): void {
    this.router.navigate(['/welcome/']).then(() => null);
  }
}
