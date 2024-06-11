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
import { ErrorService } from '../../shared/services/error.service';
import { TranslateModule } from '@ngx-translate/core';
import { requiredValidator } from '../../shared/validators/required.directive';
import { emailValidator } from '../../shared/validators/email.directive';
import { SpinnerComponent } from '../../shared/components/spinner/spinner.component';
import { LoadingButtonComponent } from '../../shared/components/forms/loading-button/loading-button.component';

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
    TranslateModule,
    SpinnerComponent,
    LoadingButtonComponent,
  ],
})
export class SignInFormComponent {
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private errorService: ErrorService,
  ) {}
  errorMessage: string | null = '';
  isLoading: boolean = false;

  ngOnInit(): void {
    this.setErrorMessageFromQuery();
  }

  signInForm = this.fb.group({
    email: ['email@example.com', [requiredValidator(), emailValidator()]],
    password: ['Example123!', [requiredValidator()]],
  });

  setErrorMessageFromQuery() {
    this.route.queryParamMap.subscribe((params) => {
      this.errorMessage = params.get('error');
    });
  }

  onSubmit() {
    if (!this.signInForm.valid) return;
    this.isLoading = true;

    const value = this.signInForm.value;

    this.authService.signIn(value.email!, value.password!).subscribe({
      next: () => {
        this.isLoading = false;
        this.navigateAfterLogin();
      },
      error: (err: HttpErrorResponse) => {
        this.isLoading = false;
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
