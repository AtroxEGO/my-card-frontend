import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';
import { Card } from './card.service';

export type Socials = {
  [key: string]: string;
};

export type vCard = {
  fullName: string;
  email?: string;
  phone?: string;
  photo?: vCardPhoto;
  socialUrls: Socials;
  role?: string;
  uid: string;
};

type vCardPhoto = {
  data: string;
  type: 'base64' | 'url';
};

export enum vCardEncoding {
  none = '',
  utf8 = ';CHARSET=utf-8',
}

@Injectable({ providedIn: 'root' })
export class vCardService {
  constructor() {}

  async getVCardAsBlob(
    vCard: vCard,
    encoding: vCardEncoding = vCardEncoding.none,
  ): Promise<Blob> {
    const data = await this.getVCardAsString(vCard, encoding);

    return new Blob([data], { type: 'text/vcard' });
  }

  // vCard RFC Standard
  // https://datatracker.ietf.org/doc/html/rfc6350
  async getVCardAsString(
    vCard: vCard,
    encoding: vCardEncoding = vCardEncoding.none,
  ): Promise<string> {
    let vCardString = '';

    // Add Headers
    vCardString += 'BEGIN:VCARD\n';
    vCardString += 'VERSION:4.0\n';

    // Add Full Name
    vCardString += 'FN' + encoding + ':' + vCard.fullName + '\n';

    // Add Photo
    if (vCard.photo) {
      vCardString +=
        'PHOTO;ENCODING=b;TYPE=JPEG:' +
        (await this.getBase64Photo(vCard.photo)) +
        '\n';
    }

    if (vCard.phone) {
      vCardString += 'TEL;VALUE=uri:tel:' + vCard.phone + '\n';
    }

    if (vCard.email) {
      vCardString += 'EMAIL:' + vCard.email + '\n';
    }

    if (vCard.role) {
      vCardString += 'TITLE' + encoding + ':' + vCard.role + '\n';
    }

    // Add Socials
    if (vCard.socialUrls) {
      this.formatSocialsForVCard(vCard.socialUrls).forEach((social) => {
        vCardString += social + '\n';
      });
    }

    // Add UID
    vCardString += 'UID:' + vCard.uid + '\n';

    vCardString += 'END:VCARD';

    return vCardString;
  }

  async getBase64Photo(photo: vCardPhoto): Promise<string> {
    let base64PhotoData = '';

    if (photo.type === 'url') {
      base64PhotoData = await this.fetchBase64Image(photo.data);
    } else base64PhotoData = photo.data;

    // remove the prefix ('data:image/jpeg;base64,')
    const photoDataParts = base64PhotoData.split(',');

    return photoDataParts[photoDataParts.length - 1];
  }

  async fetchBase64Image(url: string): Promise<string> {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  formatSocialsForVCard(socialUrls: Socials) {
    const formattedSocials: string[] = [];
    Object.keys(socialUrls).forEach((socialKey) => {
      const formattedSocial = `X-SOCIALPROFILE;type=${socialKey}:${socialUrls[socialKey]}`;

      formattedSocials.push(formattedSocial);
    });

    return formattedSocials;
  }

  cardToVCard(card: Card) {
    const socialUrls: Socials = {};
    let email = '';
    let phone = '';

    // Transfrom card socials to match vCard's format
    card.socials.forEach((currentValue) => {
      if (currentValue.socialName === 'email') {
        email = currentValue.value;
      } else if (currentValue.socialName === 'phone') {
        phone = currentValue.value;
      } else {
        socialUrls[currentValue.socialName] = currentValue.value;
      }
    });

    // const photoData = await this.getBase64Image(this.card.photoUrl);

    const vCardData: vCard = {
      role: card.jobTitle,
      email: email,
      fullName: card.fullName,
      photo: { data: card.photoUrl, type: 'url' },
      phone,
      socialUrls: socialUrls,
      uid: card.id,
    };

    return vCardData;
  }
}
