import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { LoginResponse, UserToken } from '../login/models/login.response';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<UserToken>;
  constructor(private httpClient: HttpClient, private router: Router) {
    const storedUser = localStorage.getItem('currentUser');
    const parsedUser = storedUser ? JSON.parse(storedUser) : null;
    this.currentUserSubject = new BehaviorSubject<UserToken>(parsedUser);
  }

  public get currentUserValue(): UserToken {
    return this.currentUserSubject.value;
  }

  public isLoggedIn(): boolean {
    return this.currentUserValue !== null;
  }
}
