import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppStateService } from '../../../app-state.service';
import { BaseResponse } from '../../../responses/base-response';
import { catchError } from 'rxjs/operators';
import { HandleError } from '../../../handle-error';
import { UserListResponse } from '../../../responses/user-list-response';

@Injectable({
    providedIn: 'root',
})
export class UserListService {

    constructor(
        private http: HttpClient,
        private appStateService: AppStateService,
    ) {
    }

    get appState() { return this.appStateService.appState; }

    getUsers() {

        const headers = new HttpHeaders({ 'authorization': this.appState.userToken });

        return this.http.get<UserListResponse>(`${this.appState.baseUrl}/users`, { headers }).pipe(
            catchError(HandleError<UserListResponse>('Getting users')),
        );
    }

    deleteUser(userId: number) {

        const headers = new HttpHeaders({ 'authorization': this.appState.userToken });

        return this.http.delete<BaseResponse>(`${this.appState.baseUrl}/users/${userId}`, { headers }).pipe(
            catchError(HandleError<BaseResponse>('Deleting user')),
        );
    }
}
