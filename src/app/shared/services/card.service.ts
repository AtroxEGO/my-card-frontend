import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';

export type Card = {
  id: string;
  slug: string;
  fullName: string;
  jobTitle: string;
  photoUrl: string;
  primaryColor: string;
  secondaryColor: string;
  bio: string;
  socials: [
    {
      socialName: string;
      value: string;
    },
  ];
};

@Injectable({ providedIn: 'root' })
export class CardService {
  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {}

  getCard(id: string): Observable<Card> {
    const path = environment.apiBaseUrl + '/cards/' + id;
    return this.http
      .get<Card>(path, { withCredentials: true })
      .pipe(shareReplay());
  }

  patchCard(data: any) {
    // console.log(data.get('socials'));
    const userID = this.authService.getUserID();
    const path = environment.apiBaseUrl + '/cards/' + userID;
    return this.http
      .patch<{
        message: string;
        updatedCard: Card;
      }>(path, data, { withCredentials: true })
      .pipe(shareReplay());
  }
}
