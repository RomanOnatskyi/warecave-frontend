import { Component, OnInit } from '@angular/core';
import { NotificationCenterService } from '../notification-center.service';
import { AppStateService } from '../../../../app-state.service';
import { Notification } from '../../../../responses/notifications-response';

@Component({
    selector: 'app-notification-center',
    templateUrl: './notification-center.component.html',
    styleUrls: ['./notification-center.component.css'],
})
export class NotificationCenterComponent implements OnInit {

    constructor(
        private appStateService: AppStateService,
        private notificationCenterService: NotificationCenterService,
    ) {}

    async ngOnInit() {

        this.notifications = await this.loadNotifications();
    }

    notifications: Notification[];

    get appState() { return this.appStateService.appState; }

    private async loadNotifications() {

        const notificationsResponse = await this.notificationCenterService.getNotifications().toPromise();
        const error = [notificationsResponse.errors];

        this.showError(error);

        return notificationsResponse.notifications;
    }

    async markNotificationAsRead(notificationId: number) {
        const response = await this.notificationCenterService.markNotificationAsRead(notificationId).toPromise();
        const error = [response.errors];

        this.showError(error);

        this.notifications = await this.loadNotifications();

        const unreadNotificationsResponse = await this.notificationCenterService.hasUserUnreadNotifications(this.appState.renterId).toPromise();
        this.appState.hasUnreadNotifications = unreadNotificationsResponse.hasUnreadNotifications;
    }

    private showError(errors: string[]) {

        for (let i = 0; i < errors.length; i++) {
            if (errors[i]) {
                alert(errors[i]);
            }
        }
    }
}
