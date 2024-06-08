import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Card, CardService } from '../shared/services/card.service';
import { CommonModule } from '@angular/common';
import { DividerComponent } from '../shared/components/divider/divider.component';
import { CardViewComponent } from './card-view/card-view.component';
import { ErrorComponent } from '../shared/components/error/error.component';
import { HttpErrorResponse } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { CardErrorCodes, GeneralErrorCodes } from '../shared/errors/errorCodes';
import { ErrorService } from '../shared/services/error.service';

@Component({
  selector: 'app-card-page',
  standalone: true,
  imports: [CommonModule, DividerComponent, CardViewComponent, ErrorComponent],
  templateUrl: './card-page.component.html',
})
export class CardPageComponent {
  cardId: string = '';
  card!: Card;
  errorMessage!: string;

  constructor(
    private route: ActivatedRoute,
    private cardService: CardService,
    private router: Router,
    private titleService: Title,
    private errorService: ErrorService,
  ) {}

  ngOnInit() {
    this.setCardIdFromSlug();

    this.cardService.getCard(this.cardId).subscribe({
      next: (card) => {
        this.card = card;
        this.redirectToSlugUrl(card);
        this.titleService.setTitle(`MyCard | ${card.fullName}`);
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 404) {
          this.errorMessage = CardErrorCodes.NOT_FOUND;
          return;
        }
        this.errorMessage = this.errorService.formatError(err);
      },
    });
  }

  handleCardUpdate(cardData: Card) {
    this.card = cardData;
  }

  setCardIdFromSlug() {
    const slug = this.route.snapshot.paramMap.get('slug')!;
    const strict = this.route.snapshot.queryParamMap.get('strict');

    this.cardId = this.cardService.getCardIdFromSlug(slug, strict);
  }

  redirectToSlugUrl(card: Card) {
    const url = this.cardService.getCardSlugUrl(card.fullName, card.slug);

    this.router.navigate([url]);
  }
}
