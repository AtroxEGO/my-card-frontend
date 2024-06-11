import { Component, Input, SimpleChanges } from '@angular/core';
import Chart from 'chart.js/auto';
import { CountryData } from '../analytics-page.component';
import {
  TranslateModule,
  TranslatePipe,
  TranslateService,
} from '@ngx-translate/core';
import countriesTranslation from 'i18n-iso-countries';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './chart.component.html',
})
export class ChartComponent {
  constructor(private translateService: TranslateService) {}
  public chart: any;
  @Input() data?: CountryData[];
  labels?: string[];
  visitAmounts?: number[];

  async ngOnInit() {
    await this.registerTranslationLocales();

    this.reloadChart();

    this.translateService.onLangChange.subscribe(() => {
      this.reloadChart();
    });
  }

  async registerTranslationLocales() {
    const enLang = await import('i18n-iso-countries/langs/en.json');
    const plLang = await import('i18n-iso-countries/langs/pl.json');

    countriesTranslation.registerLocale(enLang);
    countriesTranslation.registerLocale(plLang);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes['data'] &&
      changes['data'].currentValue != null &&
      !changes['data'].firstChange
    ) {
      this.reloadChart();
    }
  }

  reloadChart() {
    if (this.chart) {
      this.chart.destroy();
      this.chart = undefined;
    }
    this.createLabels();
    this.createVisitAmounts();
    this.createChart();
  }

  createLabels() {
    const currentLang = this.translateService.currentLang;
    const countryCodes = this.data?.map(
      ({ countryCode }) =>
        countriesTranslation.getName(countryCode, currentLang) ||
        this.translateService.instant(
          'pages.analytics.countries.unknown-country',
        ),
    );

    this.labels = countryCodes;
  }

  createVisitAmounts() {
    const visitAmounts = this.data?.map(({ count }) => count);
    this.visitAmounts = visitAmounts;
  }

  createChart() {
    this.chart = new Chart('CountriesChart', {
      type: 'doughnut',
      data: {
        labels: this.labels,
        datasets: [
          {
            label: this.translateService.instant(
              'pages.analytics.countries.visits',
            ),
            data: this.visitAmounts,
            hoverOffset: 30,
          },
        ],
      },
      options: {
        layout: {
          padding: 20,
        },

        responsive: true,
        color: '#FFFFFF',
        resizeDelay: 300,
        maintainAspectRatio: false,
      },
    });
  }
}
