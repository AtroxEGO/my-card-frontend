import { Component } from '@angular/core';
import { ChartComponent } from './chart/chart.component';
import { AuthService } from '../shared/services/auth.service';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { DividerComponent } from '../shared/components/divider/divider.component';
import { Observable } from 'rxjs';

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
  imports: [ChartComponent, DividerComponent],
  templateUrl: './analytics-page.component.html',
})
export class AnalyticsPageComponent {
  constructor(
    private authService: AuthService,
    private httpClient: HttpClient,
  ) {}
  loading = true;
  analytics: AnalyticsData | undefined;

  async ngOnInit() {
    this.fetchAnalytics();
  }

  fetchAnalytics() {
    const userID = this.authService.getUserID();

    const url = environment.apiBaseUrl + `/cards/${userID}/analytics`;

    this.httpClient
      .get<AnalyticsData>(url, { withCredentials: true })
      // }
      .subscribe({
        next: (analytics) => {
          this.loading = false;
          this.analytics = analytics;
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        },
      });
  }
}
