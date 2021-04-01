import { BaseResponse } from './base-response';

export class NotificationData {
    notificationId: number;
    premiseId: number;
    rentDay: number;
    communalDay: number;
}

export class NotificationsDataResponse extends BaseResponse {
    notificationsData: NotificationData[];
}
