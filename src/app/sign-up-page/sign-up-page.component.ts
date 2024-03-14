import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CustomInputComponent } from '../shared/forms/custom-input/custom-input.component';
import { CustomPasswordInputComponent } from '../shared/forms/custom-password-input/custom-password-input.component';
import { DividerComponent } from '../shared/divider/divider.component';

@Component({
  selector: 'app-sign-up-page',
  standalone: true,
  imports: [
    RouterLink,
    CustomInputComponent,
    CustomPasswordInputComponent,
    DividerComponent,
  ],
  templateUrl: './sign-up-page.component.html',
})
export class SignUpPageComponent {}
