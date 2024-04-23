import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-google-auth-button',
  standalone: true,
  imports: [],
  templateUrl: './google-auth-button.component.html',
})
export class GoogleAuthButtonComponent {
  constructor(private authService: AuthService) {}
  handleClick() {
    this.authService.signInByGoogle().subscribe({
      next: (response) => {
        console.log(response);
        window.location.href = response.url;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
  }
}
