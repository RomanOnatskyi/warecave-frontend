import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppStateService } from '../../../app-state.service';
import { catchError } from 'rxjs/operators';
import { HandleError } from '../../../handle-error';
import { AnomalyVisitsResponse } from '../../../responses/anomaly-visits-response';
import { BaseResponse } from '../../../responses/base-response';

@Injectable({
    providedIn: 'root',
})
export class NotificationCenterService {

    constructor(
        private http: HttpClient,
        private appStateService: AppStateService,
    ) {
    }

    get appState() { return this.appStateService.appState; }

    getAnomalyVisits() {

        const headers = new HttpHeaders({ 'authorization': this.appState.userToken });

        return this.http.get<AnomalyVisitsResponse>(`${this.appState.baseUrl}/anomaly-visits`, { headers }).pipe(
            catchError(HandleError<AnomalyVisitsResponse>('Getting anomaly visits')),
        );
    }

    deleteVisit(visitId: number) {

        const headers = new HttpHeaders({ 'authorization': this.appState.userToken });

        return this.http.delete<BaseResponse>(`${this.appState.baseUrl}/anomaly-visits/${visitId}`, { headers }).pipe(
            catchError(HandleError<BaseResponse>('Deleting anomaly visit')),
        );
    }
}
