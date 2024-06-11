import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-card-avatar',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './card-avatar.component.html',
})
export class CardAvatarComponent {
  @Input() photoUrl: string = '';
  @Input({ required: true }) isOwner!: boolean;
}
