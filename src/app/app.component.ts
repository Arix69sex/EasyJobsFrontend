import {AfterContentInit, Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "./services/auth.service";
import {TokenService} from "./services/token.service";
import {UserService} from "./services/user.service";
import {User} from "./models/user";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterContentInit {
  title = 'EasyJobsTailwindFrontend';
  currentUser: User;
  userName: string;

  constructor(private router: Router,
              private userService: UserService,
              private authService: AuthService,
              private tokenService: TokenService) {
  }

  ngAfterContentInit(){
    this.userName = this.getCurrentCuentaEmail()
  }

  checkCurrentRoute(){
    return this.router.url
  }

  getCurrentCuentaEmail(){
    let user = this.tokenService.getUser()
    let name = user.email
    if (name != null){
      name = name.split('@')[0]
      return name
    }
    else return
  }

  checkIfLoggedIn(){
    return this.tokenService.getToken() != null
  }

  logout(){
    this.tokenService.signOut()
    this.router.navigate(['/']).then(() => null);
  }

  getPageName(url: string) {
    let index = url.lastIndexOf("/") + 1;
    let filenameWithExtension = url.substr(index);
     // <-- added this line
    return filenameWithExtension.split(".")[0];                                    // <-- added this line
  }

  goToHome() {
    this.router.navigate(['/home/']).then(() => null);
  }

  goToProfile(){
    this.router.navigate(['/profile/']).then(() => null);
  }

  goToHistory(){
    this.router.navigate(['/history/']).then(() => null);
  }
}
