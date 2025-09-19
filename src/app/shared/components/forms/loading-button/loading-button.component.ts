import { Component, Input } from '@angular/core';
import { SpinnerComponent, SpinnerSize } from '../../spinner/spinner.component';

export type LoadingButtonPadding = {
  x: number;
  y: number;
};

@Component({
    selector: 'app-loading-button',
    imports: [SpinnerComponent],
    templateUrl: './loading-button.component.html'
})
export class LoadingButtonComponent {
  @Input() isLoading: boolean = false;
  @Input() rounded: boolean = true;
  @Input() spinnerSize: SpinnerSize = 'normal';
  @Input() padding: LoadingButtonPadding = { x: 5, y: 2 };
}
