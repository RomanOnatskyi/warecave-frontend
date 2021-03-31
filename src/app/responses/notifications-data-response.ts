import { BaseResponse } from './base-response';

export class NotificationData {
    premiseId: number;
    rentDay: number;
    communalDay: number;
}

export class NotificationsDataResponse extends BaseResponse {
    notificationsData: NotificationData[];
}
