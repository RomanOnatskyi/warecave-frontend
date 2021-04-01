import * as E from 'linq';
import * as moment from 'moment';
import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { RentChartService } from '../rent-chart.service';
import { ChartData } from '../../../../responses/rent-chart-response';
import { AppStateService } from '../../../../app-state.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-sells-chart',
    templateUrl: './rent-chart.component.html',
    styleUrls: ['./rent-chart.component.css'],
})
export class RentChartComponent implements OnInit {

    constructor(
        private appStateService: AppStateService,
        private sellsChartService: RentChartService,
        private translate: TranslateService,
    ) {}

    get appState() { return this.appStateService.appState; }

    chartPoints: ChartData[];
    sellsChart: Chart = [];
    chartLabel: string;

    async ngOnInit() {

        this.translate.get('rent-chart.chart-label').subscribe((res: string) => {
            this.chartLabel = res;
        });

        this.sellsChart = this.getLineChart();
        await this.getChartData();
    }

    private getLineChart() {

        const labels = E.from(this.chartPoints)
            .select(i => moment(i.day).format('DD-MM-YYYY'))
            .toArray();

        const data = E.from(this.chartPoints)
            .select(i => i.rentAmount)
            .toArray();

        return new Chart('canvas', {
            type: 'bar',
            data: {
                labels,
                datasets: [
                    {
                        data,
                        label: this.chartLabel,
                        borderColor: '#33eec9',
                        backgroundColor: '#9fa5a5',
                    }
                ]
            },
            options: {
                legend: {
                    display: false,
                },
                scales: {
                    xAxes: [{
                        display: true,

                    }],
                    yAxes: [{
                        display: true,
                        stepSize: 1
                    }],
                }
            }
        });
    }

    async getChartData() {

        this.chartPoints = await this.getChartPoints();

        this.sellsChart = this.getLineChart();
    }

    private async getChartPoints() {

        const sellsChartResponse = await this.sellsChartService.getDataForChart().toPromise();

        const error = [ sellsChartResponse.errors ];

        this.showError(error);

        return sellsChartResponse.recordList;
    }

    private showError(errors: string[]) {

        for (let i = 0; i < errors.length; i++) {
            if (errors[i]) {
                alert(errors[i]);
            }
        }
    }
}
