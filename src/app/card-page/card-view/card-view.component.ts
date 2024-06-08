import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Card } from '../../shared/services/card.service';
import { DividerComponent } from '../../shared/components/divider/divider.component';
import { CardAvatarComponent } from './card-avatar/card-avatar.component';
import { AuthService } from '../../shared/services/auth.service';
import { CardSocialItemComponent } from './card-social-item/card-social-item.component';
import { CardEditFormComponent } from './card-edit-form/card-edit-form.component';
import { CardShareComponent } from './card-share/card-share.component';
import { CommonModule } from '@angular/common';
import {
  vCard,
  vCardEncoding,
  vCardService,
} from '../../shared/services/vCard.service';
import { TranslateModule } from '@ngx-translate/core';

export type UserState = 'default' | 'editing' | 'sharing';

@Component({
  selector: 'app-card-view',
  standalone: true,
  imports: [
    DividerComponent,
    CardAvatarComponent,
    CardSocialItemComponent,
    CardEditFormComponent,
    CardShareComponent,
    CommonModule,
    TranslateModule,
  ],
  templateUrl: './card-view.component.html',
})
export class CardViewComponent {
  constructor(
    private authService: AuthService,
    private vCardService: vCardService,
  ) {}

  @Input({ required: true }) card!: Card;
  @Output() cardUpdated = new EventEmitter<Card>();
  userState: UserState = 'editing';

  setUserState(state: UserState) {
    this.userState = state;
  }

  isOwner() {
    const cardID = this.card.id;
    const userID = this.authService.getUserID();

    return cardID === userID;
  }

  vCard!: vCard;

  async ngOnInit() {
    // this.vCard = await this.generateVCard();
  }

  handleCardUpdate(cardData: any) {
    this.cardUpdated.emit(cardData);
  }

  async handleAddToContactsClick() {
    const vCard = this.vCardService.cardToVCard(this.card);
    const vCardBlob = await this.vCardService.getVCardAsBlob(
      vCard,
      vCardEncoding.utf8,
    );
    this.downloadBlob(vCardBlob, this.card.fullName);
  }

  downloadBlob(blob: Blob, filename: string) {
    const a: HTMLAnchorElement = document.createElement('a');
    const url = URL.createObjectURL(blob);
    a.style.display = 'none';
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }
}
