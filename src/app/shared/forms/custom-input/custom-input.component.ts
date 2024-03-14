import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-custom-input',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './custom-input.component.html',
})
export class CustomInputComponent {
  @Input({ required: true }) name: string = '';
  @Input({ required: true }) id: string = '';
  @Input({ required: true }) placeholder: string = '';
  @Input({ required: true }) control: FormControl = new FormControl('');

  get borderColor() {
    return this.control.errors ? 'border-red-500' : 'border-gray-500';
  }
}
