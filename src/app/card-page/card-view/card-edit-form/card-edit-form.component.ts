import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormsModule,
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
    socials: this.fb.array([]),
  });

  ngOnInit() {
    this.cardForm.patchValue({
      fullName: this.card.fullName,
      jobTitle: this.card.jobTitle,
      bio: this.card.bio,
    });

    this.card.socials?.forEach((social) => {
      this.socials.push(
        this.fb.group({
          socialName: [social.socialName],
          value: [social.value],
        }),
      );
    });
  }

  uploadAvatar(avatarFile: File) {
    const formData = new FormData();
    formData.append('avatarFile', avatarFile);

    this.cardService.patchCard(formData).subscribe({
      next: (data) => {
        this.cardUpdated.emit(data.updatedCard);
        this.formClosed.emit();
      },
      error: (err: HttpErrorResponse) => {
        // TODO
      },
    });
  }

  onSubmit() {
    if (!this.cardForm.valid) return;

    const avatarFile = this.cardForm.value.avatarFile;

    if (avatarFile) {
      this.uploadAvatar(avatarFile);
    }

    if (!this.didChange()) {
      if (!avatarFile) this.formClosed.emit();
      return;
    }

    this.cardService.patchCard(this.cardForm.value).subscribe({
      next: (data) => {
        this.cardUpdated.emit(data.updatedCard);
        if (!avatarFile) {
          this.formClosed.emit();
        }
      },
      error: (err: HttpErrorResponse) => {
        // TODO
      },
    });
  }

  getControl(name: string) {
    return this.cardForm.get(name) as FormControl;
  }

  get socials() {
    return this.cardForm.get('socials') as FormArray;
  }

  handleClose() {
    this.formClosed.emit();
    this.cardForm.reset();
  }

  didChange() {
    const watchedAttributes = ['bio', 'jobTitle', 'fullName', 'socials'];
    const oldData = this.card as { [key: string]: any };
    const newData = this.cardForm.value as { [key: string]: any };

    for (const attribute of watchedAttributes) {
      const oldAttribute = JSON.stringify(oldData[attribute]);
      const newAttribute = JSON.stringify(newData[attribute]);
      if (oldAttribute != newAttribute) {
        console.log(oldData[attribute], newData[attribute]);
        return true;
      }
    }
    return false;
  }
}
