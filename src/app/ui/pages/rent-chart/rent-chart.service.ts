import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppStateService } from '../../../app-state.service';
import { catchError } from 'rxjs/operators';
import { HandleError } from '../../../handle-error';
import { RentChartResponse } from '../../../responses/rent-chart-response';

@Injectable({
    providedIn: 'root',
})
export class RentChartService {

    constructor(
        private http: HttpClient,
        private appStateService: AppStateService,
    ) {
    }

    get appState() { return this.appStateService.appState; }

    getDataForChart() {

        const headers = new HttpHeaders({ 'authorization': this.appState.userToken });

        return this.http.get<RentChartResponse>(`${this.appState.baseUrl}/statistics/rent/${this.appState.renterId}`, { headers }).pipe(
            catchError(HandleError<RentChartResponse>('Getting data for chart')),
        );
    }
}
