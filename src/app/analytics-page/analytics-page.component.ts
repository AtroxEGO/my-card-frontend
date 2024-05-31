import { Component } from '@angular/core';
import { ChartComponent } from './chart/chart.component';
import { AuthService } from '../shared/services/auth.service';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { DividerComponent } from '../shared/components/divider/divider.component';
import { Observable } from 'rxjs';
import { SpinnerComponent } from '../shared/components/spinner/spinner.component';
import { ErrorComponent } from '../shared/components/error/error.component';

export type CountryData = {
  countryCode: string;
  count: number;
};

type AnalyticsData = {
  visits: {
    total: number;
    unique: number;
    countries: CountryData[];
  };
};

@Component({
  selector: 'app-analytics-page',
  standalone: true,
  imports: [ChartComponent, DividerComponent, SpinnerComponent, ErrorComponent],
  templateUrl: './analytics-page.component.html',
})
export class AnalyticsPageComponent {
  constructor(
    private authService: AuthService,
    private httpClient: HttpClient,
  ) {}
  isLoading = false;
  analytics: AnalyticsData | undefined;
  errorMessage = '';

  async ngOnInit() {
    this.fetchAnalytics();
  }

  fetchAnalytics() {
    const timeout = setTimeout(() => {
      this.isLoading = true;
    }, 300);
    const userID = this.authService.getUserID();

    const url = environment.apiBaseUrl + `/cards/${userID}/analytics`;

    this.httpClient
      .get<AnalyticsData>(url, { withCredentials: true })
      // }
      .subscribe({
        next: (analytics) => {
          clearTimeout(timeout);
          this.isLoading = false;
          this.analytics = analytics;
        },
        error: (err: HttpErrorResponse) => {
          clearTimeout(timeout);
          this.handleError(err);
        },
      });
  }

  handleError(err: HttpErrorResponse) {
    if (err.status === 404) {
      this.errorMessage = "This card doesn't exist!";
      return;
    }

    if (err.statusText != 'Unknown Error') {
      this.errorMessage = err.statusText;
      return;
    }

    this.errorMessage = 'Unexpected Error, try again later.';
  }
}
