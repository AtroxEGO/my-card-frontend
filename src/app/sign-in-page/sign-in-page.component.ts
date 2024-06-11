import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SignInFormComponent } from './sign-in-form/sign-in-form.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-sign-in-page',
  standalone: true,
  templateUrl: './sign-in-page.component.html',
  imports: [RouterLink, SignInFormComponent, TranslateModule],
})
export class SignInPageComponent {
  constructor(
    private titleService: Title,
    private translateService: TranslateService,
  ) {}
  ngOnInit() {
    this.translateService.get('pages.sign-in.title').subscribe((title) => {
      this.titleService.setTitle(title);
    });
  }
}
