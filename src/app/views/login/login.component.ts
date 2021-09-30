import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CuentaService} from "../../services/cuenta.service";
import {AuthService} from "../../services/auth.service";
import {TokenService} from "../../services/token.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage = '';
  roles: string[] = [];


  constructor(private router: Router,
              private cuentaService: CuentaService,
              private authService: AuthService,
              private tokenService: TokenService,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
    if (this.tokenService.getToken()) {
      this.roles = this.tokenService.getUser().roles;
    }
  }

  submitForm(): void {
    if (this.loginForm.invalid) {
      return;
    }
    this.authService.login(this.loginForm.value).subscribe(
      data => {
        this.tokenService.saveToken(data.accessToken);
        this.tokenService.saveUser(data);
        this.authService.setLoggedInStatus(true)
        this.roles = this.tokenService.getUser().roles;

        return this.router.navigate(['/home']).then(() => {
          this.authService.setLoggedInStatus(true)
          window.location.reload();
        });
      },
      error => {
        this.errorMessage = error.error.errorMessage;
      }
    );
  }
  cancelForm(): void {
    this.router.navigate(['/welcome/']).then(() => null);
  }
}
