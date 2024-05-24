import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Card, CardService } from '../shared/services/card.service';
import { CommonModule } from '@angular/common';
import { DividerComponent } from '../shared/components/divider/divider.component';
import { CardViewComponent } from './card-view/card-view.component';
import { NotFoundComponent } from '../shared/components/error/error.component';
import { HttpErrorResponse } from '@angular/common/http';
import { getCardIdFromSlug, getCardSlugUrl } from '../shared/utils/card';

@Component({
  selector: 'app-card-page',
  standalone: true,
  imports: [
    CommonModule,
    DividerComponent,
    CardViewComponent,
    NotFoundComponent,
  ],
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
  ) {}

  ngOnInit() {
    this.setCardIdFromSlug();

    this.cardService.getCard(this.cardId).subscribe({
      next: (card) => {
        this.card = card;

        this.redirectToSlugUrl(card);
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
      this.errorMessage = "This card doesn't exist!";
      return;
    }

    if (err.message) {
      this.errorMessage = err.statusText;
      return;
    }

    this.errorMessage = 'Unexpected Error, try again later.';
  }

  redirectToSlugUrl(card: Card) {
    const url = getCardSlugUrl(card.fullName, card.slug);

    this.router.navigate([url]);
  }
}
