import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  userObj: any = {
    username: '',
    password: ''
  }

  constructor(private router: Router) {

  }

  onLogin() {
    if (this.userObj.username == "admin" && this.userObj.password == "123") {
      this.router.navigateByUrl("dashboard")
    } else {
      alert("Username or password is wrong")
    }
  }
}
