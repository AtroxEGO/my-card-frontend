import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

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
  constructor(private http: HttpClient) {}

  getCard(id: string): Observable<Card> {
    const path = environment.apiBaseUrl + '/cards/' + id;
    return this.http.get<Card>(path);
  }
}
