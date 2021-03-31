import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppStateService } from '../../../app-state.service';
import { catchError } from 'rxjs/operators';
import { HandleError } from '../../../handle-error';
import { Premise, PremisesResponse } from '../../../responses/premise-response';
import { BaseResponse } from '../../../responses/base-response';
import { SubrentersResponse } from '../../../responses/subrenter-response';
import { NotificationsDataResponse } from '../../../responses/notifications-data-response';

@Injectable({
    providedIn: 'root',
})
export class PremisesService {

    constructor(
        private http: HttpClient,
        private appStateService: AppStateService,
    ) {
    }

    get appState() { return this.appStateService.appState; }

    getPremises() {

        const headers = new HttpHeaders({ 'authorization': this.appState.userToken });

        return this.http.get<PremisesResponse>(`${this.appState.baseUrl}/premise/${this.appState.renterId}`, { headers }).pipe(
            catchError(HandleError<PremisesResponse>('Getting premises')),
        );
    }

    getNotificationData() {

        const headers = new HttpHeaders({ 'authorization': this.appState.userToken });

        return this.http.get<NotificationsDataResponse>(`${this.appState.baseUrl}/notifications/data/${this.appState.renterId}`, { headers }).pipe(
            catchError(HandleError<NotificationsDataResponse>('Getting notifications data')),
        );
    }

    getSubrenters() {

        const headers = new HttpHeaders({ 'authorization': this.appState.userToken });

        return this.http.get<SubrentersResponse>(`${this.appState.baseUrl}/users/subrenters`, { headers }).pipe(
            catchError(HandleError<SubrentersResponse>('Getting subrenters')),
        );
    }

    createPremise(premise: Premise) {

        const headers = new HttpHeaders({ 'authorization': this.appState.userToken });

        return this.http.post<BaseResponse>(`${this.appState.baseUrl}/premise/${this.appState.renterId}`, premise,{ headers }).pipe(
            catchError(HandleError<BaseResponse>('Premise creating')),
        );
    }

    deletePremise(premiseId: number) {

        const headers = new HttpHeaders({ 'authorization': this.appState.userToken });

        return this.http.delete<BaseResponse>(`${this.appState.baseUrl}/premise/single/${premiseId}`, { headers }).pipe(
            catchError(HandleError<BaseResponse>('Premise creating')),
        );
    }

    updatePremise(premise: Premise) {

        const headers = new HttpHeaders({ 'authorization': this.appState.userToken });

        return this.http.put<BaseResponse>(`${this.appState.baseUrl}/premise/single/${premise.premiseId}`, premise,{ headers }).pipe(
            catchError(HandleError<BaseResponse>('Premise creating')),
        );
    }
}
