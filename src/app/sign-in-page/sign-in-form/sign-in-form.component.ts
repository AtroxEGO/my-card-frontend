import { Component } from '@angular/core';
import { DividerComponent } from '../../shared/divider/divider.component';
import { CustomPasswordInputComponent } from '../../shared/forms/custom-password-input/custom-password-input.component';
import { CustomInputComponent } from '../../shared/forms/custom-input/custom-input.component';

@Component({
  selector: 'app-sign-in-form',
  standalone: true,
  templateUrl: './sign-in-form.component.html',
  imports: [
    DividerComponent,
    CustomPasswordInputComponent,
    CustomInputComponent,
  ],
})
export class SignInFormComponent {}
