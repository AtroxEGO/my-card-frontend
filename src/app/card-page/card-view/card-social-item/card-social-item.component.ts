import { Component, Input } from '@angular/core';

type SocialItem = {
  socialName: string;
  value: string;
};

@Component({
  selector: 'app-card-social-item',
  standalone: true,
  imports: [],
  templateUrl: './card-social-item.component.html',
})
export class CardSocialItemComponent {
  @Input({ required: true }) socialItem!: SocialItem;
  hovered = false;

  getLink(): string {
    let prefix = '';
    if (this.socialItem.socialName === 'email') prefix = 'mailto:';

    return prefix + this.socialItem.value;
  }

  getDisplayValue() {
    if (!this.hovered) return this.socialItem.socialName;

    return this.socialItem.value
      .replace(/^(https?|ftp):\/\//, '')
      .replace('www.', '');
  }

  setHovered(value: boolean) {
    this.hovered = value;
  }
}
