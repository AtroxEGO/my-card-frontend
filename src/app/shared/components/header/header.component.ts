import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavComponent } from './nav/nav.component';
import { Inject } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationEnd } from '@angular/router';

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

  get isIndex() {
    return this.currentUrl === '/';
  }

  get bgColor() {
    return this.isIndex ? 'bg-white' : 'bg-transparent';
  }

  get textColor() {
    return this.isIndex ? 'text-secondary' : 'text-white';
  }
}
