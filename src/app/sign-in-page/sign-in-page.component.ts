import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SignInFormComponent } from './sign-in-form/sign-in-form.component';

@Component({
  selector: 'app-sign-in-page',
  standalone: true,
  templateUrl: './sign-in-page.component.html',
  imports: [RouterLink, SignInFormComponent],
})
export class SignInPageComponent {}
