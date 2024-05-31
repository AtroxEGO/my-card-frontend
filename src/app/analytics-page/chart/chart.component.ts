import { Component, Input, SimpleChanges } from '@angular/core';
import Chart from 'chart.js/auto';
import { CountryData } from '../analytics-page.component';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [],
  templateUrl: './chart.component.html',
})
export class ChartComponent {
  public chart: any;
  @Input() data?: CountryData[];
  labels?: string[];
  visitAmounts?: number[];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data'] && changes['data'].currentValue != null) {
      this.createLabels();
      this.createVisitAmounts();
      this.createChart();
      console.log(this.data);
    }
  }

  // TODO: Add i18n
  createLabels() {
    const countryCodes = this.data?.map(({ countryCode }) => countryCode);
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
            label: 'Visits',
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
