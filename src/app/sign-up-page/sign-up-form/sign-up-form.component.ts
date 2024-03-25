import { Component } from '@angular/core';
import { DividerComponent } from '../../shared/divider/divider.component';
import { CustomInputComponent } from '../../shared/forms/custom-input/custom-input.component';
import { CustomPasswordInputComponent } from '../../shared/forms/custom-password-input/custom-password-input.component';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

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
  constructor(private fb: FormBuilder) {}

  signUpForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    confirm: ['', [Validators.required]],
  });

  onSubmit() {}

  getControl(name: string) {
    return this.signUpForm.get(name) as FormControl;
  }
}
