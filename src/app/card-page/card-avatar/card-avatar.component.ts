import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-avatar',
  standalone: true,
  imports: [],
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
