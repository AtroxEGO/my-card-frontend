import { Component, Input, Output } from '@angular/core';
import { Card } from '../../../../shared/services/card.service';
import { CommonModule } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';

type Socials = {
  socialName: string;
  value: string;
}[];

@Component({
  selector: 'app-card-edit-social',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-edit-social.component.html',
})
export class CardEditSocialComponent {
  constructor(private fb: FormBuilder) {}

  allowedSocials = [
    'facebook',
    'youtube',
    'linkedin',
    'instagram',
    'email',
    'website',
  ];

  @Input() card!: Card;
  @Output() socials!: Socials;

  ngOnInit() {
    this.socials = this.card.socials || [
      { socialName: 'facebook', value: 'test' },
    ];
  }

  getAllowedSocials() {
    const takenSocials: string[] =
      this.socials?.map((social) => social.socialName) || [];

    const allowedSocials = this.allowedSocials.filter(
      (social) => !takenSocials.includes(social),
    );
    return allowedSocials;
  }

  handleCreateSocial(value: string) {
    this.socials.push({ socialName: value, value: '' });
  }

  handleDeleteSocial(value: any) {
    this.socials = this.socials.filter((social) => social.socialName !== value);
  }

  handleSocialChange(value: string, event: Event) {
    const target = event.target as HTMLInputElement;

    const socialIndex = this.socials.findIndex(
      (social) => social.socialName === value,
    );

    if (socialIndex !== -1) {
      this.socials[socialIndex].value = target.value;
    }
  }
}
