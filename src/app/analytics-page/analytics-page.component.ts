import { Component } from '@angular/core';
import { ChartComponent } from './chart/chart.component';
import { AuthService } from '../shared/services/auth.service';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { DividerComponent } from '../shared/components/divider/divider.component';
import { SpinnerComponent } from '../shared/components/spinner/spinner.component';
import { ErrorComponent } from '../shared/components/error/error.component';
import { Title } from '@angular/platform-browser';
import {
  PeriodOptions,
  ScopeSelectComponent,
} from './scope-select/scope-select.component';
import { CardErrorCodes } from '../shared/errors/errorCodes';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ErrorService } from '../shared/services/error.service';

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
  imports: [
    ChartComponent,
    DividerComponent,
    SpinnerComponent,
    ErrorComponent,
    ScopeSelectComponent,
    TranslateModule,
  ],
  templateUrl: './analytics-page.component.html',
})
export class AnalyticsPageComponent {
  constructor(
    private authService: AuthService,
    private httpClient: HttpClient,
    private errorService: ErrorService,
    private translateService: TranslateService,
    private titleService: Title,
  ) {}
  isLoading = false;
  analytics: AnalyticsData | undefined;
  errorMessage = '';
  selectedPeriod: PeriodOptions = '1m';

  async ngOnInit() {
    this.fetchAnalytics();
    this.translateService.get('pages.analytics.title').subscribe((title) => {
      this.titleService.setTitle(title);
    });
  }

  handleScopeChange() {
    this.fetchAnalytics();
  }

  fetchAnalytics() {
    const timeout = setTimeout(() => {
      this.isLoading = true;
    }, 300);
    const userID = this.authService.getUserID();

    const url =
      environment.apiBaseUrl +
      `/cards/${userID}/analytics?scope=${this.selectedPeriod}`;

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
      this.errorMessage = CardErrorCodes.NOT_FOUND;
      return;
    }

    this.errorMessage = this.errorService.formatError(err);
  }
}
