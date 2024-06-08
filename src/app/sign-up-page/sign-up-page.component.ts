import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SignUpFormComponent } from './sign-up-form/sign-up-form.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-sign-up-page',
  standalone: true,
  templateUrl: './sign-up-page.component.html',
  imports: [RouterLink, SignUpFormComponent, TranslateModule],
})
export class SignUpPageComponent {}
