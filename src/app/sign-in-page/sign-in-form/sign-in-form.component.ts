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
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { GoogleAuthButtonComponent } from '../../shared/components/forms/google-auth-button/google-auth-button.component';
import { AuthErrorCodes } from '../../shared/errors/errorCodes';
import { errorService } from '../../shared/services/error.service';

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
    private route: ActivatedRoute,
    private errorService: errorService,
  ) {}
  errorMessage: string | null = '';

  ngOnInit(): void {
    this.setErrorMessageFromQuery();
  }

  signInForm = this.fb.group({
    email: ['email@example.com', [Validators.required, Validators.email]],
    password: ['Example123!', [Validators.required]],
  });

  setErrorMessageFromQuery() {
    this.route.queryParamMap.subscribe((params) => {
      this.errorMessage = params.get('error');
    });
  }

  onSubmit() {
    if (!this.signInForm.valid) return;

    const value = this.signInForm.value;

    this.authService.signIn(value.email!, value.password!).subscribe({
      next: () => {
        this.navigateAfterLogin();
      },
      error: (err: HttpErrorResponse) => {
        this.setErrorMessage(err);
      },
    });
  }

  navigateAfterLogin() {
    this.route.queryParamMap.subscribe((params) => {
      const origin = params.get('origin') || '';
      const destinationURL = `/${origin}`;
      this.router.navigate([destinationURL]);
    });
  }

  setErrorMessage(error: HttpErrorResponse) {
    switch (error.status) {
      case 401:
        this.errorMessage = AuthErrorCodes.INVALID_CREDENTIALS;
        break;
      default:
        this.errorMessage = this.errorService.formatError(error);
    }
  }

  getControl(name: string) {
    return this.signInForm.get(name) as FormControl;
  }
}
