import { Component } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-landing-page',
  imports: [RouterLink, TranslateModule],
  templateUrl: './landing-page.component.html',
})
export class LandingPageComponent {
  heroText: string;
  quoteText: string;
  features: {
    eco: string;
    convenient: string;
    analitycs: string;
    accessible: string;
  };
  callToAction: string;

  constructor(
    authService: AuthService,
    router: Router,
    private translate: TranslateService,
  ) {
    if (authService.isLoggedIn()) {
      const userID = authService.getUserID();
      router.navigate([`/cards/${userID}`], { queryParams: { strict: true } });
    }

    // Use .instant for SSR-friendly translation
    this.heroText = this.translate.instant('pages.landing-page.hero');
    this.quoteText = this.translate.instant('pages.landing-page.quote');
    this.features = {
      eco: this.translate.instant('pages.landing-page.features.eco-friendly'),
      convenient: this.translate.instant(
        'pages.landing-page.features.convenient',
      ),
      analitycs: this.translate.instant(
        'pages.landing-page.features.analitycs',
      ),
      accessible: this.translate.instant(
        'pages.landing-page.features.accessible',
      ),
    };
    this.callToAction = this.translate.instant(
      'pages.landing-page.call-to-action',
    );
  }
}
