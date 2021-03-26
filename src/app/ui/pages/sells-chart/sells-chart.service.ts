import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppStateService } from '../../../app-state.service';
import { catchError } from 'rxjs/operators';
import { HandleError } from '../../../handle-error';
import { SellsChartResponse } from '../../../responses/sells-chart-response';
import { DataForGettingStatistics } from './request';

@Injectable({
    providedIn: 'root',
})
export class SellsChartService {

    constructor(
        private http: HttpClient,
        private appStateService: AppStateService,
    ) {
    }

    get appState() { return this.appStateService.appState; }

    getDataForChart(data: DataForGettingStatistics) {

        const headers = new HttpHeaders({ 'authorization': this.appState.userToken });

        return this.http.post<SellsChartResponse>(`${this.appState.baseUrl}/good/statistics/sales/`, data, { headers }).pipe(
            catchError(HandleError<SellsChartResponse>('Getting data for chart')),
        );
    }
}
