import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SignInPageComponent } from './sign-in-page/sign-in-page.component';
import { SignUpPageComponent } from './sign-up-page/sign-up-page.component';
import { CardPageComponent } from './card-page/card-page.component';
import { AnalyticsPageComponent } from './analytics-page/analytics-page.component';
import { authGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'analytics',
    title: 'MyCard | Analytics',
    component: AnalyticsPageComponent,
    canActivate: [authGuard],
  },
  {
    path: 'sign-up',
    title: 'MyCard | Sign up',
    component: SignUpPageComponent,
  },
  {
    path: 'sign-in',
    title: 'MyCard | Sign in',
    component: SignInPageComponent,
  },
  {
    path: 'cards/:slug',
    title: 'MyCard | Card',
    component: CardPageComponent,
  },
  { path: '', title: 'MyCard', component: LandingPageComponent },
];
