import { Component, OnInit } from '@angular/core';
import { DividerComponent } from '../../shared/divider/divider.component';
import { CustomPasswordInputComponent } from '../../shared/forms/custom-password-input/custom-password-input.component';
import { CustomInputComponent } from '../../shared/forms/custom-input/custom-input.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-sign-in-form',
  standalone: true,
  templateUrl: './sign-in-form.component.html',
  imports: [
    DividerComponent,
    CustomPasswordInputComponent,
    CustomInputComponent,
    ReactiveFormsModule,
  ],
})
export class SignInFormComponent {
  constructor(private fb: FormBuilder) {}

  signInForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  onSubmit() {
    console.log(this.signInForm.value);
    console.log(this.signInForm.errors);
    console.log(this.getControl('email').errors);
  }

  getControl(name: string) {
    return this.signInForm.get(name) as FormControl;
  }
}
