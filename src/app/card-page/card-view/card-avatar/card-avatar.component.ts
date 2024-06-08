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

  uploadAvatar($event: Event) {
    const target = $event.target as HTMLInputElement;
    const file = target.files?.item(0);
    console.log(file);
  }
}
