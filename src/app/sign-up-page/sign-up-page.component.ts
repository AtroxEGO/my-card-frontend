import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SignUpFormComponent } from './sign-up-form/sign-up-form.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-sign-up-page',
  standalone: true,
  templateUrl: './sign-up-page.component.html',
  imports: [RouterLink, SignUpFormComponent, TranslateModule],
})
export class SignUpPageComponent {
  constructor(
    private titleService: Title,
    private translateService: TranslateService,
  ) {}
  ngOnInit() {
    this.translateService.get('pages.sign-up.title').subscribe((title) => {
      this.titleService.setTitle(title);
    });
  }
}
