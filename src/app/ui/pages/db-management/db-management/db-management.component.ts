import { Component, OnInit } from '@angular/core';
import { DbManagementService } from '../db-management.service';
import { AppStateService } from '../../../../app-state.service';
import { BackupData } from '../../../../responses/db-backups-response';

@Component({
    selector: 'app-db-management',
    templateUrl: './db-management.component.html',
    styleUrls: ['./db-management.component.css'],
})
export class DbManagementComponent implements OnInit {

    dbBackupsData: BackupData[];

    constructor(
        private appStateService: AppStateService,
        private dbManagementService: DbManagementService,
    ) {}

    async ngOnInit() {

        this.dbBackupsData = await this.loadDbBackups();
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
