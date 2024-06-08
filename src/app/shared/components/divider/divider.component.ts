import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-divider',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './divider.component.html',
})
export class DividerComponent {
  @Input() value!: string;
  @Input() color: string = 'gray-300';
}
