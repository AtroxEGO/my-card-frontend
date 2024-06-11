import { Component, Input } from '@angular/core';

export type SpinnerSize = 'small' | 'normal';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [],
  templateUrl: './spinner.component.html',
})
export class SpinnerComponent {
  @Input() size: SpinnerSize = 'small';

  getStylesForSize() {
    switch (this.size) {
      case 'small':
        return 'border size-5';
      case 'normal':
        return 'border-2 size-8';
    }
  }
}
