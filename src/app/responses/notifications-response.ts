import { BaseResponse } from './base-response';

export class Notification {
    id: number;
    notificationId: number;
    sendingDate: string;
    text: string;
    isRead: boolean;
}

export class NotificationsResponse extends BaseResponse {
    notifications: Notification[];
}
