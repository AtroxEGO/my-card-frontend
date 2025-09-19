import { Component } from '@angular/core';
import { CustomInputComponent } from '../../shared/components/forms/custom-input/custom-input.component';
import { CustomPasswordInputComponent } from '../../shared/components/forms/custom-password-input/custom-password-input.component';
import { DividerComponent } from '../../shared/components/divider/divider.component';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { emailValidator } from '../../shared/validators/email.directive';
import { requiredValidator } from '../../shared/validators/required.directive';
import { ErrorService } from '../../shared/services/error.service';
import { TranslateModule } from '@ngx-translate/core';
import { GoogleAuthButtonComponent } from '../../shared/components/forms/google-auth-button/google-auth-button.component';
import { LoadingButtonComponent } from '../../shared/components/forms/loading-button/loading-button.component';

@Component({
    selector: 'app-sign-up-form',
    templateUrl: './sign-up-form.component.html',
    imports: [
        DividerComponent,
        CustomInputComponent,
        CustomPasswordInputComponent,
        ReactiveFormsModule,
        TranslateModule,
        GoogleAuthButtonComponent,
        LoadingButtonComponent,
    ]
})
export class SignUpFormComponent {
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private errorService: ErrorService,
  ) {}

  errorMessage: string | null = '';
  isLoading: boolean = false;

  signUpForm = this.fb.group({
    email: ['', [requiredValidator(), emailValidator()]],
    password: ['', [requiredValidator()]],
    confirm: ['', [requiredValidator()]],
  });

  ngOnInit() {
    this.setErrorMessageFromQuery();
  }

  onSubmit() {
    if (!this.signUpForm.valid) return;

    this.isLoading = true;

    const value = this.signUpForm.value;

    this.authService
      .signUp(value.email!, value.password!, value.confirm!)
      .subscribe({
        next: () => {
          this.isLoading = false;
          this.router.navigate(['/']);
        },
        error: (err: HttpErrorResponse) => {
          this.isLoading = false;
          if (err.status === 400) {
            this.errorService.setFormErrorFromHttpError(err, this.signUpForm);
            return;
          }
          this.errorMessage = this.errorService.formatError(err);
        },
      });
  }

  setErrorMessageFromQuery() {
    this.route.queryParamMap.subscribe((params) => {
      this.errorMessage = params.get('error');
    });
  }

  getControl(name: string) {
    return this.signUpForm.get(name) as FormControl;
  }
}
