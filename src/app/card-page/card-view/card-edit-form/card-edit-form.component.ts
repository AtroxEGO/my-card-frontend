import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CustomInputComponent } from '../../../shared/components/forms/custom-input/custom-input.component';
import { Card, CardService } from '../../../shared/services/card.service';
import { CustomTextareaComponent } from '../../../shared/components/forms/custom-textarea/custom-textarea.component';
import { DividerComponent } from '../../../shared/components/divider/divider.component';
import { CustomFileInputComponent } from '../../../shared/components/forms/custom-file-input/custom-file-input.component';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CardEditSocialComponent } from './card-edit-social/card-edit-social.component';

@Component({
  selector: 'app-card-edit-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CustomInputComponent,
    CustomTextareaComponent,
    DividerComponent,
    CustomFileInputComponent,
    CommonModule,
    CardEditSocialComponent,
  ],
  templateUrl: './card-edit-form.component.html',
})
export class CardEditFormComponent {
  constructor(
    private fb: FormBuilder,
    private cardService: CardService,
  ) {}
  @Input({ required: true }) card!: Card;
  @Output() formClosed = new EventEmitter<void>();
  @Output() cardUpdated = new EventEmitter<Card>();

  cardForm = this.fb.group({
    avatarFile: [null],
    fullName: [this.card?.fullName, [Validators.required]],
    jobTitle: [this.card?.jobTitle, [Validators.required]],
    bio: [this.card?.bio, [Validators.required]],
    socials: [null],
  });

  ngOnInit() {
    this.cardForm.setValue({
      avatarFile: null,
      fullName: this.card.fullName,
      jobTitle: this.card.jobTitle,
      bio: this.card.bio,
      socials: null,
    });
  }

  onSubmit() {
    console.log(this.cardForm.value);
    if (!this.cardForm.valid) return;

    const formData = new FormData();

    Object.keys(this.cardForm.value).forEach((formControlName) => {
      const value = this.cardForm.get(formControlName)?.value;
      formData.append(formControlName, value);
    });

    this.cardService.patchCard(formData).subscribe({
      next: (data) => {
        this.formClosed.emit();
        this.cardUpdated.emit(data.updatedCard);
      },
      error: (err: HttpErrorResponse) => {
        // TODO
      },
    });
  }

  getControl(name: string) {
    return this.cardForm.get(name) as FormControl;
  }

  handleClose() {
    this.formClosed.emit();
    this.cardForm.reset();
  }
}
