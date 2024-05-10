import { Component, Input } from '@angular/core';
import { ClipboardService } from 'ngx-clipboard';

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
  constructor(private clipboardService: ClipboardService) {}
  @Input({ required: true }) socialItem!: SocialItem;
  hovered = false;
  copied = false;

  handleClick() {
    if (this.socialItem.socialName === 'email') {
      this.clipboardService.copy(this.socialItem.value);
      this.copied = true;
      return;
    }

    window.open(this.socialItem.value, '_blank');
  }

  getLink(): string {
    let prefix = '';
    if (this.socialItem.socialName === 'email') prefix = 'mailto:';

    return prefix + this.socialItem.value;
  }

  getDisplayValue() {
    if (!this.hovered) return this.socialItem.socialName;
    if (this.copied) return 'Copied!';
    return this.socialItem.value
      .replace(/^(https?|ftp):\/\//, '')
      .replace('www.', '');
  }

  setHovered(value: boolean) {
    this.hovered = value;
    this.copied = false;
  }
}
