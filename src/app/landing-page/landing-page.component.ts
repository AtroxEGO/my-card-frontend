import { Component } from '@angular/core';
import { FooterComponent } from '../shared/footer/footer.component';
import { LandingPageContentComponent } from './landing-page-content/landing-page-content.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [FooterComponent, LandingPageContentComponent],
  templateUrl: './landing-page.component.html',
})
export class LandingPageComponent {}
