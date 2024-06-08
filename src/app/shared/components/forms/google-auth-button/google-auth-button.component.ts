import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { ErrorService } from '../../../services/error.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-google-auth-button',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './google-auth-button.component.html',
})
export class GoogleAuthButtonComponent {
  constructor(
    private authService: AuthService,
    private errorService: ErrorService,
    private router: Router,
  ) {}
  handleClick() {
    this.authService.signInByGoogle().subscribe({
      next: (response) => {
        window.location.href = response.url;
      },
      error: (err: HttpErrorResponse) => {
        const formattedError = this.errorService.formatError(err);
        this.router.navigate([], { queryParams: { error: formattedError } });
      },
    });
  }
}
