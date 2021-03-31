import { BaseResponse } from './base-response';

export class BackupData {
    backupId: number;
    date: string;
    recoveryModel: string;
    user: string;
    backupSize: number;
    isDamaged: boolean;
}

export class DbBackupsResponse extends BaseResponse {
    backupList: BackupData[];
}


