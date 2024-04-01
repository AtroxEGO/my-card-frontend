import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Card, CardService } from '../shared/services/card.service';
import { CommonModule } from '@angular/common';
import { DividerComponent } from '../shared/components/divider/divider.component';
import { CardViewComponent } from './card-view/card-view.component';
import { NotFoundComponent } from '../shared/components/not-found/not-found.component';

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
  error: string = '';

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
    this.cardService.getCard(this.cardSlug).subscribe((card) => {
      this.card = card;

      const fullNameSlug = this.slugify(this.card?.fullName || '');

      const url =
        this.card?.fullName !== null
          ? `/cards/${fullNameSlug}-${card.slug}`
          : `/cards/${card.slug}`;

      this.router.navigate([url]);
    });
  }

  private slugify = (value: string) => {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };
}

// Error
// Path
// Sign In
