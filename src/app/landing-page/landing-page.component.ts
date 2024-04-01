import { Component } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [],
  templateUrl: './landing-page.component.html',
})
export class LandingPageComponent {
  constructor(authService: AuthService, router: Router) {
    if (authService.isLoggedIn()) {
      const userID = authService.getUserID();
      router.navigate([`/cards/${userID}`], { queryParams: { strict: true } });
    }
  }
}
