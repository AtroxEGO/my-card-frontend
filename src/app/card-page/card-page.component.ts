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
import { TranslateService } from '@ngx-translate/core';
import { SpinnerComponent } from '../shared/components/spinner/spinner.component';

@Component({
  selector: 'app-card-page',
  standalone: true,
  imports: [
    CommonModule,
    DividerComponent,
    CardViewComponent,
    ErrorComponent,
    SpinnerComponent,
  ],
  templateUrl: './card-page.component.html',
})
export class CardPageComponent {
  cardId: string = '';
  card!: Card;
  errorMessage!: string;
  isLoading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private cardService: CardService,
    private router: Router,
    private titleService: Title,
    private errorService: ErrorService,
    private translateService: TranslateService,
  ) {}

  ngOnInit() {
    const timeout = setTimeout(() => {
      this.isLoading = true;
    }, 300);

    this.setCardIdFromSlug();
    this.setTranslatedPageTitle();

    this.cardService.getCard(this.cardId).subscribe({
      next: (card) => {
        this.card = card;
        this.redirectToSlugUrl(card);
        this.setTranslatedPageTitle();
        clearTimeout(timeout);
        this.isLoading = false;
      },
      error: (err: HttpErrorResponse) => {
        clearTimeout(timeout);
        this.isLoading = false;
        if (err.status === 404) {
          this.errorMessage = CardErrorCodes.NOT_FOUND;
          return;
        }
        this.errorMessage = this.errorService.formatError(err);
      },
    });
  }

  setTranslatedPageTitle() {
    if (this.card?.fullName) {
      this.titleService.setTitle(`MyCard | ${this.card.fullName}`);
    } else {
      this.translateService
        .get('components.header.card')
        .subscribe((translation) => {
          this.titleService.setTitle(`MyCard | ${translation}`);
        });
    }
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
