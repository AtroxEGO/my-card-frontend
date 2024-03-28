import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavComponent } from './nav/nav.component';
import { Inject } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationEnd } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  imports: [NavComponent, RouterLink],
})
export class HeaderComponent {
  currentUrl!: string;

  constructor(@Inject(Router) private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url;
      }
    });
  }

  get showAuthButtons() {
    let showAuthButtons = false;
    if (this.currentUrl === '/') showAuthButtons = true;
    if (this.currentUrl.startsWith('/cards/')) showAuthButtons = true;
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
}
