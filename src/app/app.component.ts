import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    ReactiveFormsModule,
    TranslateModule,
  ],
  providers: [],
})
export class AppComponent {
  constructor(
    translate: TranslateService,
    private cookieService: CookieService,
  ) {
    translate.addLangs(['en', 'pl']);
    translate.setDefaultLang('en');

    // If user selected language, use it.
    const userPreferredLanguage = this.cookieService.get('user-preferred-lang');
    if (userPreferredLanguage) {
      translate.use(
        userPreferredLanguage?.match(/en|pl/) ? userPreferredLanguage : 'en',
      );
      return;
    }

    const browserLang = translate.getBrowserLang();
    translate.use(browserLang?.match(/en|pl/) ? browserLang : 'en');
  }
}
