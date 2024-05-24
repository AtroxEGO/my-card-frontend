import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [],
  templateUrl: './error.component.html',
})
export class NotFoundComponent {
  @Input() message: string = 'Unexpected Error, try again later.';
}
