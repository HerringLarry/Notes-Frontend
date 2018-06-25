import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { CreateUserDto } from './create-user.dto';
@Injectable()

export class LoginService {

  constructor(private http: HttpClient) {}

  login(email: string) {
    const send = new CreateUserDto(email);
    return this.http.post('http://localhost:3002/auth/login', send);
  }

  signUp(email: string) {
    const send = new CreateUserDto(email);
    return this.http.post('http://localhost:3002/auth/signup', send);
  }
}
