import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import removeAccents from 'remove-accents';
import { Card, CardService } from '../shared/services/card.service';
import { CommonModule } from '@angular/common';
import { DividerComponent } from '../shared/components/divider/divider.component';
import { CardViewComponent } from './card-view/card-view.component';
import { NotFoundComponent } from '../shared/components/not-found/not-found.component';
import { HttpErrorResponse } from '@angular/common/http';

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
  cardSlug: string = '';
  card!: Card;
  errorMessage!: string;

  constructor(
    private route: ActivatedRoute,
    private cardService: CardService,
    private router: Router,
  ) {}

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug')!;
    const slugParts = slug.split('-');
    this.cardSlug = this.route.snapshot.queryParamMap.get('strict')
      ? slug
      : slugParts[slugParts.length - 1];

    this.cardService.getCard(this.cardSlug).subscribe({
      next: (card) => {
        this.card = card;

        const fullNameSlug = this.slugify(this.card?.fullName || '');

        const url =
          this.card?.fullName !== null
            ? `/cards/${fullNameSlug}-${card.slug}`
            : `/cards/${card.slug}`;

        this.router.navigate([url]);
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 404) {
          this.errorMessage = "This card doesn't exist!";
          return;
        }

        this.errorMessage = 'Unexpected Error, try again later.';
      },
    });
  }

  handleCardUpdate(cardData: Card) {
    this.card = cardData;
  }

  private slugify = (value: string) => {
    return removeAccents(value)
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };
}
