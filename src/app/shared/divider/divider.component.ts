import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-divider',
  standalone: true,
  imports: [],
  templateUrl: './divider.component.html',
})
export class DividerComponent {
  @Input({ required: true }) value!: string;
}
