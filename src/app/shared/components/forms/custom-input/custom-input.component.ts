import { Component, Input } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-custom-input',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './custom-input.component.html',
})
export class CustomInputComponent {
  constructor(private formDirective: FormGroupDirective) {}

  @Input({ required: true }) name: string = '';
  @Input({ required: true }) id: string = '';
  @Input({ required: true }) placeholder: string = '';
  @Input({ required: true }) control: FormControl = new FormControl('');

  get showErrors(): boolean {
    return this.control.invalid && this.formDirective.submitted;
  }

  get borderColor() {
    return this.showErrors ? 'border-red-500' : 'border-gray-500';
  }
}
