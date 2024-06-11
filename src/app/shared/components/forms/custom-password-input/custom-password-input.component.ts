import { Component, Input } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  ReactiveFormsModule,
} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-custom-password-input',
  standalone: true,
  imports: [ReactiveFormsModule, TranslateModule],
  templateUrl: './custom-password-input.component.html',
})
export class CustomPasswordInputComponent {
  constructor(private formDirective: FormGroupDirective) {}

  @Input({ required: true }) name!: string;
  @Input({ required: true }) inputID!: string;
  @Input({ required: true }) placeholder!: string;
  @Input({ required: true }) control: FormControl = new FormControl('');
  isShown = false;

  get inputType() {
    return this.isShown ? 'text' : 'password';
  }

  get toggleButtonText() {
    return this.isShown
      ? 'forms.auth.password-input-visibility-button-hidden'
      : 'forms.auth.password-input-visibility-button-visible';
  }

  get showErrors(): boolean {
    return (
      this.control.invalid &&
      this.formDirective.submitted &&
      !!this.control.errors
    );
  }

  getErrors(): Array<string> {
    const errorsArray = Object.values(this.control.errors as Array<string>);
    return errorsArray;
  }

  get borderColor() {
    return this.showErrors ? 'border-red-500' : 'border-gray-500';
  }

  toggleShown() {
    this.isShown = !this.isShown;
  }
}
