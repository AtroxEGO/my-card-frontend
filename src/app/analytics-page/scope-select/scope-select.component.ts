import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ScopeSelectBtnComponent } from './scope-select-btn/scope-select-btn.component';
import { TranslateModule } from '@ngx-translate/core';

export type PeriodOptions = '24h' | '7d' | '1m' | '1y';

@Component({
  selector: 'app-scope-select',
  standalone: true,
  imports: [ScopeSelectBtnComponent, TranslateModule],
  templateUrl: './scope-select.component.html',
})
export class ScopeSelectComponent {
  @Input() selected: PeriodOptions = '1m';
  @Output() selectedChange = new EventEmitter<PeriodOptions>();
  options: PeriodOptions[] = ['24h', '7d', '1m', '1y'];

  changeSelected(option: PeriodOptions) {
    this.selected = option;
    this.selectedChange.emit(this.selected);
  }
}
