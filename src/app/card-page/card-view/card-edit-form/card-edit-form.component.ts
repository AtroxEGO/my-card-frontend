import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CustomInputComponent } from '../../../shared/components/forms/custom-input/custom-input.component';
import { Card } from '../../../shared/services/card.service';
import { CustomTextareaComponent } from '../../../shared/components/forms/custom-textarea/custom-textarea.component';

@Component({
  selector: 'app-card-edit-form',
  standalone: true,
  imports: [ReactiveFormsModule, CustomInputComponent, CustomTextareaComponent],
  templateUrl: './card-edit-form.component.html',
})
export class CardEditFormComponent {
  constructor(private fb: FormBuilder) {}
  @Input({ required: true }) card!: Card;
  @Output() formClosed = new EventEmitter<void>();

  cardForm = this.fb.group({
    fullName: [this.card?.fullName, [Validators.required, Validators.email]],
    jobTitle: [this.card?.jobTitle, [Validators.required]],
    bio: [this.card?.bio, [Validators.required]],
    socials: [{}],
  });

  onSubmit() {
    console.log(this.cardForm.value);
  }

  getControl(name: string) {
    return this.cardForm.get(name) as FormControl;
  }

  handleClose() {
    this.formClosed.emit();
    this.cardForm.reset();
  }
}
