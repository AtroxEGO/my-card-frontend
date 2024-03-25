import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SignUpFormComponent } from './sign-up-form/sign-up-form.component';

@Component({
  selector: 'app-sign-up-page',
  standalone: true,
  templateUrl: './sign-up-page.component.html',
  imports: [RouterLink, SignUpFormComponent],
})
export class SignUpPageComponent {}
