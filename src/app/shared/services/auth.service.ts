import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { shareReplay } from 'rxjs';
import { environment } from '../../../environments/environment';
import { catchError, tap } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';
import moment from 'moment';

type AuthPayload = {
  accessToken: string;
};

type GoogleAuthPayload = {
  status: string;
  url: string;
};

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  signIn(email: string, password: string) {
    const path = environment.apiBaseUrl + '/auth/login';
    return this.http
      .post<AuthPayload>(path, { email, password })
      .pipe(tap(this.setSession), shareReplay());
  }

  signUp(email: string, password: string, confirm: string) {
    const path = environment.apiBaseUrl + '/users';
    return this.http
      .post<AuthPayload>(path, { email, password, confirm })
      .pipe(tap(this.setSession), shareReplay());
  }

  signInByGoogle() {
    const path = environment.apiBaseUrl + '/auth/google/login';
    return this.http.get<GoogleAuthPayload>(path).pipe();
  }

  private setSession(authResult: AuthPayload) {
    const accessToken = authResult.accessToken;
    const tokenData = jwtDecode(accessToken);
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('expiresAt', tokenData.exp!.toString());
    localStorage.setItem('userID', tokenData.sub!);
  }

  signOut() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('expiresAt');
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem('expiresAt');
    return moment(Number(expiration) * 1000);
  }

  getUserID() {
    const isLoggedIn = this.isLoggedIn();
    const userID = localStorage.getItem('userID');
    return isLoggedIn ? userID : undefined;
  }
}
