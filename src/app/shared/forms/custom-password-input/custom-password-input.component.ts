import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-custom-password-input',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './custom-password-input.component.html',
})
export class CustomPasswordInputComponent {
  @Input({ required: true }) name!: string;
  @Input({ required: true }) id!: string;
  @Input({ required: true }) placeholder!: string;
  @Input({ required: true }) control: FormControl = new FormControl('');
  isShown = false;

  get inputType() {
    return this.isShown ? 'text' : 'password';
  }

  get toggleButtonText() {
    return this.isShown ? 'Hide' : 'Show';
  }

  toggleShown() {
    this.isShown = !this.isShown;
  }
}
