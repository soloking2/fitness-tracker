import { Injectable } from '@angular/core';
import { User, AuthData } from './user.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private user: User;
  authSubject = new Subject<boolean>();

  constructor(private router: Router) {}

  registerUser(authdata: AuthData) {
    this.user = {
      email: authdata.email,
      userId: Math.round(Math.random() * 10000).toString()
    };
    this.authSuccess();
  }

  login(authdata: AuthData) {
    this.user = {
      email: authdata.email,
      userId: Math.round(Math.random() * 10000).toString()
    };
    this.authSuccess();
  }

  logout() {
    this.user = null;
    this.authSubject.next(false);
    this.router.navigate(['/login']);
  }

  getUser() {
    return {...this.user};
  }

  isAuth() {
    return this.user != null;
  }

  private authSuccess() {
    this.authSubject.next(true);
    this.router.navigate(['/training']);
  }
}
