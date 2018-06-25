import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {
  enteredUsername = '';

  constructor(private _loginServer: LoginService, private router: Router) { }

  ngOnInit() {
  }

  login() {
    window.sessionStorage.removeItem('token');
    this._loginServer.login(this.enteredUsername).subscribe(res => {
      window.sessionStorage.setItem('token', res.token + '');
      this.router.navigate(['./notes'])
    },
      error => console.log(error) );
  }

  signUp() {
    this._loginServer.signUp(this.enteredUsername).subscribe(res => this.login(),
                                                             error => console.log(error) );
  }
}
