import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Card, CardService } from '../shared/services/card.service';
import { CommonModule } from '@angular/common';
import { DividerComponent } from '../shared/components/divider/divider.component';
import { CardViewComponent } from './card-view/card-view.component';
import { ErrorComponent } from '../shared/components/error/error.component';
import { HttpErrorResponse } from '@angular/common/http';
import { getCardIdFromSlug, getCardSlugUrl } from '../shared/utils/card';
import { Title } from '@angular/platform-browser';
import { CardErrorCodes, GeneralErrorCodes } from '../shared/errors/errorCodes';

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
        this.handleError(err);
      },
    });
  }

  handleCardUpdate(cardData: Card) {
    this.card = cardData;
  }

  setCardIdFromSlug() {
    const slug = this.route.snapshot.paramMap.get('slug')!;
    const strict = this.route.snapshot.queryParamMap.get('strict');

    this.cardId = getCardIdFromSlug(slug, strict);
  }

  handleError(err: HttpErrorResponse) {
    if (err.status === 404) {
      this.errorMessage = CardErrorCodes.NOT_FOUND;
      return;
    }

    // TODO
    if (err.message) {
      // this.errorMessage = err.statusText;
      this.errorMessage = 'TODO!!!';
      return;
    }

    this.errorMessage = GeneralErrorCodes.UNEXPECTED;
  }

  redirectToSlugUrl(card: Card) {
    const url = getCardSlugUrl(card.fullName, card.slug);

    this.router.navigate([url]);
  }
}
