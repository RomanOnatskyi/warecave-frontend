import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppStateService } from '../../../app-state.service';
import { catchError } from 'rxjs/operators';
import { HandleError } from '../../../handle-error';
import { BaseResponse } from '../../../responses/base-response';
import { DbBackupsResponse } from '../../../responses/db-backups-response';

@Injectable({
    providedIn: 'root',
})
export class DbManagementService {

    constructor(
        private http: HttpClient,
        private appStateService: AppStateService,
    ) {
    }

    get appState() { return this.appStateService.appState; }

    getDbBackups() {

        const headers = new HttpHeaders({ 'authorization': this.appState.userToken });

        return this.http.get<DbBackupsResponse>(`${this.appState.baseUrl}/database/timestamps`, { headers }).pipe(
            catchError(HandleError<DbBackupsResponse>('Getting backups')),
        );
    }

    createBackup() {

        const headers = new HttpHeaders({ 'authorization': this.appState.userToken });

        return this.http.post<BaseResponse>(`${this.appState.baseUrl}/database/backup`, null,{ headers }).pipe(
            catchError(HandleError<BaseResponse>('Database backup creating')),
        );
    }

    restoreDatabase(backupId: number) {

        const headers = new HttpHeaders({ 'authorization': this.appState.userToken });

        return this.http.post<BaseResponse>(`${this.appState.baseUrl}/database/restore`, { backupId }, { headers }).pipe(
            catchError(HandleError<BaseResponse>('Premise creating')),
        );
    }
}
