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

  cardForm = this.fb.group({
    fullName: [this.card?.fullName, [Validators.required]],
    jobTitle: [this.card?.jobTitle, [Validators.required]],
    bio: [this.card?.bio, [Validators.required]],
    socials: [],
  });

  ngOnInit() {
    this.cardForm.setValue({
      fullName: this.card.fullName,
      jobTitle: this.card.jobTitle,
      bio: this.card.bio,
      socials: null,
    });
  }

  onSubmit() {
    if (this.cardForm.valid) {
      this.cardService.patchCard(this.cardForm.value).subscribe({
        next: () => {
          this.formClosed.emit();
          // this.router.navigate(['/']);
        },
        error: (err: HttpErrorResponse) => {
          //   if (err.status === 401) {
          //     this.errorMessage = 'Invalid email or password.';
          //     return;
          //   }
          //   if (err.status === 429) {
          //     this.errorMessage = 'Too many retries, try again in 60s.';
          //     return;
          //   }
          //   this.errorMessage = 'Unexpected error, try again later.';
          // },
        },
      });
    }
  }

  getControl(name: string) {
    return this.cardForm.get(name) as FormControl;
  }

  handleClose() {
    this.formClosed.emit();
    this.cardForm.reset();
  }
}
