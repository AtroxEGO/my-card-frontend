import { Component, Input } from '@angular/core';
import { Card } from '../../shared/services/card.service';
import { DividerComponent } from '../../shared/components/divider/divider.component';
import { CardAvatarComponent } from '../card-avatar/card-avatar.component';
import { AuthService } from '../../shared/services/auth.service';
import { CardSocialItemComponent } from './card-social-item/card-social-item.component';

@Component({
  selector: 'app-card-view',
  standalone: true,
  imports: [DividerComponent, CardAvatarComponent, CardSocialItemComponent],
  templateUrl: './card-view.component.html',
})
export class CardViewComponent {
  constructor(private authService: AuthService) {}

  @Input({ required: true }) card!: Card;

  isOwner() {
    const cardID = this.card.id;
    const userID = this.authService.getUserID();

    return cardID === userID;
  }
}
