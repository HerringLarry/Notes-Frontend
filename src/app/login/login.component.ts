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

  handleLogin(res) {
    console.log(res);
    if (res.hasOwnProperty('token')) {
      window.sessionStorage.setItem('token', res.token + '');
      this.router.navigate(['./notes']);
    }
  }

  handleError(error){
    if (error.statusText === 'Not Found') {
      alert('User Not Found');
    } else {
      alert('Issue With Server, Please Try Again Later');
    }
  }
  login() {
    window.sessionStorage.removeItem('token');
    this._loginServer.login(this.enteredUsername).subscribe(res => this.handleLogin(res),
                                                            error => this.handleError(error) );
  }

  signUp() {
    if (this.enteredUsername.length > 0) {
      this._loginServer.signUp(this.enteredUsername).subscribe(res => this.login(),
                                                              error => this.handleError(error) );
    } else {
      alert('Please Enter Valid Username');
    }
  }
}
