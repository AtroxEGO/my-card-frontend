import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-scope-select-btn',
  standalone: true,
  imports: [],
  templateUrl: './scope-select-btn.component.html',
})
export class ScopeSelectBtnComponent {
  @Input() selected!: boolean;

  getColor() {
    if (this.selected) {
      return 'bg-primary hover:bg-blue-800 text-white';
    }

    return 'bg-white hover:bg-slate-200';
  }
}
