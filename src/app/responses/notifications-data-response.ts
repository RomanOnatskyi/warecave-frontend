import { BaseResponse } from './base-response';

export class NotificationData {
    notificationId: number;
    premiseId: number;
    sendingDay: number;
    typeId: number;
}

export class NotificationsDataResponse extends BaseResponse {
    notificationsData: NotificationData[];
}
