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

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  signIn(email: string, password: string) {
    const path = environment.apiBaseUrl + '/auth/login';
    return this.http.post<AuthPayload>(path, { email, password }).pipe(
      tap(this.setSession),
      shareReplay(),
    );
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
    return localStorage.getItem('userID');
  }
}
