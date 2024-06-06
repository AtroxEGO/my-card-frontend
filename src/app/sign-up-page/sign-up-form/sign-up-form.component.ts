import { Component } from '@angular/core';
import { CustomInputComponent } from '../../shared/components/forms/custom-input/custom-input.component';
import { CustomPasswordInputComponent } from '../../shared/components/forms/custom-password-input/custom-password-input.component';
import { DividerComponent } from '../../shared/components/divider/divider.component';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { GeneralErrorCodes } from '../../shared/errors/errorCodes';
import { emailValidator } from '../../shared/validators/email.directive';
import { requiredValidator } from '../../shared/validators/required.directive';
import { errorService } from '../../shared/services/error.service';

@Component({
  selector: 'app-sign-up-form',
  standalone: true,
  templateUrl: './sign-up-form.component.html',
  imports: [
    DividerComponent,
    CustomInputComponent,
    CustomPasswordInputComponent,
    ReactiveFormsModule,
  ],
})
export class SignUpFormComponent {
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private errorService: errorService,
  ) {}

  errorMessage = '';

  signUpForm = this.fb.group({
    email: ['', [requiredValidator(), emailValidator()]],
    password: ['', [requiredValidator()]],
    confirm: ['', [requiredValidator()]],
  });

  onSubmit() {
    if (!this.signUpForm.valid) return;

    const value = this.signUpForm.value;

    this.authService
      .signUp(value.email!, value.password!, value.confirm!)
      .subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (err: HttpErrorResponse) => {
          if (err.status === 400) {
            this.errorService.setFormErrorFromHttpError(err, this.signUpForm);
            return;
          }
          this.errorMessage = this.errorService.formatError(err);
        },
      });
  }

  getControl(name: string) {
    return this.signUpForm.get(name) as FormControl;
  }
}
