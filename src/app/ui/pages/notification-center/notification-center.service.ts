import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppStateService } from '../../../app-state.service';
import { catchError } from 'rxjs/operators';
import { HandleError } from '../../../handle-error';
import { NotificationsResponse } from '../../../responses/notifications-response';
import { BaseResponse } from '../../../responses/base-response';
import { UnreadNotificationsResponse } from '../../../responses/unread-notifications-response';

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

    getNotifications() {

        const headers = new HttpHeaders({ 'authorization': this.appState.userToken });

        return this.http.get<NotificationsResponse>(`${this.appState.baseUrl}/notifications/${this.appState.renterId}`, { headers }).pipe(
            catchError(HandleError<NotificationsResponse>('Getting notifications')),
        );
    }

    markNotificationAsRead(notificationId: number) {

        const headers = new HttpHeaders({ 'authorization': this.appState.userToken });

        return this.http.put<BaseResponse>(`${this.appState.baseUrl}/notifications/markAsRead/${notificationId}`, null, { headers }).pipe(
            catchError(HandleError<BaseResponse>('Marking notification')),
        );
    }

    hasUserUnreadNotifications(userId: number) {

        const headers = new HttpHeaders({ 'authorization': this.appState.userToken });

        return this.http.get<UnreadNotificationsResponse>(`${this.appState.baseUrl}/notifications/hasUnread/${userId}`, { headers }).pipe(
            catchError(HandleError<UnreadNotificationsResponse>('Determination unread notifications')),
        );
    }
}
