import { Component } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-landing-page',
    imports: [RouterLink, TranslateModule],
    templateUrl: './landing-page.component.html'
})
export class LandingPageComponent {
  constructor(authService: AuthService, router: Router) {
    if (authService.isLoggedIn()) {
      const userID = authService.getUserID();
      router.navigate([`/cards/${userID}`], { queryParams: { strict: true } });
    }
  }
}
