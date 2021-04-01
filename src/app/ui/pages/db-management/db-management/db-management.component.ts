import { Component, OnInit } from '@angular/core';
import { DbManagementService } from '../db-management.service';
import { AppStateService } from '../../../../app-state.service';
import { BackupData } from '../../../../responses/db-backups-response';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-db-management',
    templateUrl: './db-management.component.html',
    styleUrls: ['./db-management.component.css'],
})
export class DbManagementComponent implements OnInit {

    dbBackupsData: BackupData[];
    message: string;

    constructor(
        private appStateService: AppStateService,
        private dbManagementService: DbManagementService,
        private translate: TranslateService,
    ) {}

    async ngOnInit() {

        this.dbBackupsData = await this.loadDbBackups();
        this.translate.get('db-management.db-restored').subscribe((res: string) => {
            this.message = res;
        });
    }

    private async loadDbBackups() {

        let response = await this.dbManagementService.getDbBackups().toPromise();
        return response.backupList;
    }

    async createBackup() {
        await this.dbManagementService.createBackup().toPromise();
        this.dbBackupsData = await this.loadDbBackups();
    }

    async restoreDatabase(backupId: number) {
        let response = await this.dbManagementService.restoreDatabase(backupId).toPromise();
        alert(response.errors ? response.errors : 'Базу даних відновлено')
    }
}
