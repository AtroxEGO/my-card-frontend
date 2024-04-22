import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { NavigationEnd } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  imports: [RouterLink],
})
export class HeaderComponent {
  currentUrl!: string;

  constructor(
    private router: Router,
    private authService: AuthService,
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
}
