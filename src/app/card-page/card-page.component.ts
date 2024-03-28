import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Card, CardService } from '../shared/services/card.service';
import { CommonModule } from '@angular/common';
import { DividerComponent } from '../shared/components/divider/divider.component';

@Component({
  selector: 'app-card-page',
  standalone: true,
  imports: [CommonModule, DividerComponent],
  templateUrl: './card-page.component.html',
})
export class CardPageComponent {
  cardSlug: string = '';
  card$!: Observable<Card>;
  constructor(
    private route: ActivatedRoute,
    private cardService: CardService,
  ) {}
  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug')!;
    const slugParts = slug.split('-');
    this.cardSlug = slugParts[slugParts.length - 1];
    this.card$ = this.cardService.getCard(this.cardSlug);

    console.log(
      this.card$.subscribe((data) => {
        console.log(data);
      }),
    );
  }
}
