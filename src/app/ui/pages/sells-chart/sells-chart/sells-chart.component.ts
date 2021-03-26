import * as E from 'linq';
import * as moment from 'moment';
import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { SellsChartService } from '../sells-chart.service';
import { ChartData } from '../../../../responses/sells-chart-response';
import { DataForGettingStatistics } from '../request';
import { AppStateService } from '../../../../app-state.service';
import { Product } from '../../../../responses/product-response';
import { ProductsService } from '../../products/products.service';

@Component({
    selector: 'app-sells-chart',
    templateUrl: './sells-chart.component.html',
    styleUrls: ['./sells-chart.component.css'],
})
export class SellsChartComponent implements OnInit {

    constructor(
        private appStateService: AppStateService,
        private sellsChartService: SellsChartService,
        private productsService: ProductsService,
    ) {}

    get appState() { return this.appStateService.appState; }

    allProducts: Product[];
    dataForGettingStatistics: DataForGettingStatistics = new DataForGettingStatistics();
    chartPoints: ChartData[];
    sellsChart: Chart = [];

    async ngOnInit() {

        this.dataForGettingStatistics.dateFrom = this.getCurrentDateAsString();
        this.dataForGettingStatistics.dateTo = this.getCurrentDateAsString();
        // this.dataForGettingStatistics.dateFrom = "2020-11-22";
        // this.dataForGettingStatistics.dateTo = "2020-12-09";

        this.allProducts = await this.loadProducts();

        this.dataForGettingStatistics.goodId = this.allProducts[0].productId;

        this.sellsChart = this.getLineChart();
    }

    private async loadProducts() {

        let response = await this.productsService.getProducts().toPromise();

        return response.products;
    }

    private getLineChart() {

        const labels = E.from(this.chartPoints)
            .select(i => moment(i.Day).format('DD-MM-YYYY'))
            .toArray();

        const data = E.from(this.chartPoints)
            .select(i => i.GoodsCount)
            .toArray();

        return new Chart('canvas', {
            type: 'line',
            data: {
                labels,
                datasets: [
                    {
                        data,
                        label: 'Продано одиниць',
                        borderColor: '#33eec9',
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

        this.dataForGettingStatistics.storeId = this.appState.storeId;

        this.chartPoints = await this.getChartPoints(this.dataForGettingStatistics);

        this.sellsChart = this.getLineChart();

        console.log("this.chartPoints =", this.chartPoints);
    }

    private async getChartPoints(dataForGettingStatistics) {

        const sellsChartResponse = await this.sellsChartService.getDataForChart(dataForGettingStatistics).toPromise();

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

    getCurrentDateAsString() {

        let currentLocalTime = new Date().toUTCString();
        let hoursOffsetGMT = new Date().getTimezoneOffset() / 60;

        currentLocalTime += hoursOffsetGMT.toString();

        return new Date(currentLocalTime).toISOString().slice(0, 10);
    }
}
