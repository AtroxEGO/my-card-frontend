import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SignInPageComponent } from './sign-in-page/sign-in-page.component';

export const routes: Routes = [
  {
    path: 'sign-in',
    title: 'MyCard | Sign in',
    component: SignInPageComponent,
  },
  { path: '', title: 'MyCard', component: LandingPageComponent },
];
