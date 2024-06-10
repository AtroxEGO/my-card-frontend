import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { shareReplay } from 'rxjs';
import { environment } from '../../../environments/environment';
import { tap } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';
import moment from 'moment';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

type AuthPayload = {
  sessionToken: string;
};

type GoogleAuthPayload = {
  status: string;
  url: string;
};

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private cookieSerivce: CookieService,
  ) {}

  signIn(email: string, password: string) {
    const path = environment.apiBaseUrl + '/auth/login';
    return this.http
      .post<AuthPayload>(path, { email, password }, { withCredentials: true })
      .pipe(shareReplay());
  }

  signUp(email: string, password: string, confirm: string) {
    const path = environment.apiBaseUrl + '/users';
    return this.http
      .post<AuthPayload>(
        path,
        { email, password, confirm },
        { withCredentials: true },
      )
      .pipe(shareReplay());
  }

  signInByGoogle() {
    const path = environment.apiBaseUrl + '/auth/google/login';
    return this.http.get<GoogleAuthPayload>(path).pipe();
  }

  signOut() {
    this.cookieSerivce.delete('sessionToken', '/', this.getCookieDomain());
    this.cookieSerivce.delete('sessionToken');
    this.cookieSerivce.delete('sessionToken', '/');
    this.router.navigate(['/sign-in']);
  }

  isLoggedIn() {
    const sessionToken = this.getSessionToken();
    if (!sessionToken) return false;

    console.log(
      `Checking is logged in: \n Token: ${sessionToken}\n IsLoggedIn: ${moment().isBefore(this.getExpiration())}`,
    );
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = jwtDecode(this.getSessionToken()).exp!.toString();

    return moment(Number(expiration) * 1000);
  }

  getSessionToken() {
    return this.cookieSerivce.get('sessionToken');
  }

  getUserID() {
    const isLoggedIn = this.isLoggedIn();

    const sessionToken = this.getSessionToken();

    if (!sessionToken) return undefined;

    const userID = jwtDecode(sessionToken).sub!;
    return isLoggedIn ? userID : undefined;
  }

  getCookieDomain() {
    if (environment.production) {
      return '.polakiewicz.com';
    }
    return 'localhost';
  }
}
