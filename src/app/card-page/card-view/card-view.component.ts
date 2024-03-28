import { Component, Input } from '@angular/core';
import { Card } from '../../shared/services/card.service';
import { DividerComponent } from '../../shared/components/divider/divider.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-card-view',
  standalone: true,
  imports: [DividerComponent],
  templateUrl: './card-view.component.html',
})
export class CardViewComponent {
  @Input({ required: true }) card!: Card;
}
