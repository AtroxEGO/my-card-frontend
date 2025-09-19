import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationEnd } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HeaderButtonComponent } from './header-button/button.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  imports: [HeaderButtonComponent, TranslateModule],
})
export class HeaderComponent {
  currentUrl!: string;

  constructor(
    private router: Router,
    private authService: AuthService,
    private translateService: TranslateService,
    private cookieService: CookieService,
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url;
      }
    });
  }

  get showAuthButtons() {
    let showAuthButtons = false;
    if (this.currentUrl === '/') showAuthButtons = true;
    if (this.currentUrl?.startsWith('/cards/')) showAuthButtons = true;
    return showAuthButtons;
  }

  get transparentHeader() {
    return this.currentUrl !== '/';
  }

  get bgColor() {
    return this.transparentHeader ? 'bg-transparent' : 'bg-white';
  }

  get textColor() {
    return this.transparentHeader ? 'text-white' : 'text-secondary';
  }

  get isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  signOut() {
    this.authService.signOut();
  }

  getCurrentLanguage() {
    const currentLanguage = this.translateService.currentLang;

    return currentLanguage;
  }

  handleLanguageToggle() {
    const currentLanguage = this.translateService.currentLang;
    const avaiableLanguages = this.translateService.langs;
    const curentLanguageIndex = avaiableLanguages.findIndex(
      (value) => value === currentLanguage,
    );
    const newLanguage =
      avaiableLanguages[curentLanguageIndex + 1] || avaiableLanguages[0];
    this.cookieService.set('user-preferred-lang', newLanguage);
    this.translateService.use(newLanguage);
  }

  navigateToHome() {
    this.router.navigate(['/']);
  }
}
