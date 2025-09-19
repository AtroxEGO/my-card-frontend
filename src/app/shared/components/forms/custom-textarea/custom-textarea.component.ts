import { Component, Input } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
    selector: 'app-custom-textarea',
    imports: [ReactiveFormsModule],
    templateUrl: './custom-textarea.component.html'
})
export class CustomTextareaComponent {
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
