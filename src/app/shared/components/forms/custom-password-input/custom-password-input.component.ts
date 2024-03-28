import { Component, Input } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-custom-password-input',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './custom-password-input.component.html',
})
export class CustomPasswordInputComponent {
  constructor(private formDirective: FormGroupDirective) {}

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

  get showErrors(): boolean {
    return this.control.invalid && this.formDirective.submitted;
  }

  get borderColor() {
    return this.showErrors ? 'border-red-500' : 'border-gray-500';
  }

  toggleShown() {
    this.isShown = !this.isShown;
  }
}
