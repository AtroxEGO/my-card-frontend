import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';
import removeAccents from 'remove-accents';
import { requiredValidator } from '../validators/required.directive';
import { emailValidator } from '../validators/email.directive';
import { phoneNumberValidator } from '../validators/phone.directive';
import { urlValidator } from '../validators/url.directive';

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
    const userID = this.authService.getUserID();
    const path = environment.apiBaseUrl + '/cards/' + userID;
    return this.http
      .patch<{
        message: string;
        updatedCard: Card;
      }>(path, data, { withCredentials: true })
      .pipe(shareReplay());
  }

  getCardIdFromSlug = (slug: string, strict: any = false) => {
    const slugParts = slug.split('-');

    // When strict get full slug as ID, else only the last part of slug
    const cardId = strict ? slug : slugParts[slugParts.length - 1];

    return cardId;
  };

  getCardSlugUrl = (fullName: string, cardID: string) => {
    const fullNameSlug = this.slugify(fullName || '');

    const url =
      fullName !== null || ''
        ? `/cards/${cardID}/${fullNameSlug}`
        : `/cards/${cardID}`;

    return url;
  };

  getListOfSocialValidators = (socialName: string) => {
    const validators = [];
    validators.push(requiredValidator());

    switch (socialName) {
      case 'email': {
        validators.push(emailValidator());
        break;
      }
      case 'phone': {
        validators.push(phoneNumberValidator());
        break;
      }
      default: {
        validators.push(urlValidator());
        break;
      }
    }

    return validators;
  };

  private slugify = (value: string) => {
    return removeAccents(value)
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };
}
