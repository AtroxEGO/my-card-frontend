import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './error.component.html',
})
export class ErrorComponent {
  @Input({ required: true }) message: string =
    'Unexpected Error, try again later.';
}
