import { CustomPasswordInputComponent } from '../../shared/components/forms/custom-password-input/custom-password-input.component';
import { Component } from '@angular/core';
import { CustomInputComponent } from '../../shared/components/forms/custom-input/custom-input.component';
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
import { GoogleAuthButtonComponent } from '../../shared/components/forms/google-auth-button/google-auth-button.component';

@Component({
  selector: 'app-sign-in-form',
  standalone: true,
  templateUrl: './sign-in-form.component.html',
  imports: [
    DividerComponent,
    CustomPasswordInputComponent,
    CustomInputComponent,
    ReactiveFormsModule,
    GoogleAuthButtonComponent,
  ],
})
export class SignInFormComponent {
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {}

  errorMessage: string = '';

  signInForm = this.fb.group({
    email: ['email@example.com', [Validators.required, Validators.email]],
    password: ['Example123!', [Validators.required]],
  });

  onSubmit() {
    if (!this.signInForm.valid) return;

    const value = this.signInForm.value;

    this.authService.signIn(value.email!, value.password!).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 401) {
          this.errorMessage = 'Invalid email or password.';
          return;
        }

        if (err.status === 429) {
          this.errorMessage = 'Too many retries, try again later.';
          return;
        }
        console.log(err);
        this.errorMessage = 'Unexpected error, try again later.';
      },
    });
  }

  getControl(name: string) {
    return this.signInForm.get(name) as FormControl;
  }
}
