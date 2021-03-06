import * as E from 'linq';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { PremisesService } from '../premises.service';
import { AppStateService } from '../../../../app-state.service';
import { Premise } from '../../../../responses/premise-response';
import { Subrenter } from '../../../../responses/subrenter-response';
import { NotificationData } from '../../../../responses/notifications-data-response';

@Component({
    selector: 'app-premises',
    templateUrl: './premises.component.html',
    styleUrls: ['./premises.component.css'],
})
export class PremisesComponent implements OnInit {

    @ViewChild('readOnlyTemplate', { static: false }) readOnlyTemplate: TemplateRef<any>;
    @ViewChild('editTemplate', { static: false }) editTemplate: TemplateRef<any>;

    premises: Premise[];
    notificationData: NotificationData[];
    subrenters: Subrenter[];
    editedPremise: Premise;
    isNewRecord: boolean;

    constructor(
        private appStateService: AppStateService,
        private premisesService: PremisesService,
    ) {}

    async ngOnInit() {

        this.premises = await this.loadPremises();
        this.subrenters = await this.loadSubrenters();
        this.notificationData = await this.loadNotificationData();
    }

    get appState() { return this.appStateService.appState; }

    private async loadPremises() {

        let response = await this.premisesService.getPremises().toPromise();
        return response.premises;
    }

    private async loadNotificationData() {

        let response = await this.premisesService.getNotificationData().toPromise();
        return response.notificationsData;
    }

    private async loadSubrenters() {

        let response = await this.premisesService.getSubrenters().toPromise();
        return response.subrenters;
    }

    addPremise() {
        this.editedPremise = new Premise(
            null,
            "",
            null,
            "",
            null,
            null,
            null,
            null,
            null,
            null,
            null,
        );

        this.premises.push(this.editedPremise);
        this.isNewRecord = true;
    }

    editPremise(premise: Premise) {
        this.editedPremise = new Premise(
            premise.premiseId,
            premise.name,
            premise.area,
            premise.address,
            premise.rentAmount,
            premise.subrenterId,
            premise.annotation,
            premise.temperature,
            premise.relativeHumidity,
            this.findNotificationData(premise.premiseId, 1) || null,
            this.findNotificationData(premise.premiseId, 2) || null
        );
    }

    isEditMode(premise: Premise) {

        return this.editedPremise && this.editedPremise.premiseId === premise.premiseId;
    }

    findNotificationData(premiseId: number, notificationType: number) {
        return E.from(this.notificationData)
            .where(i => i.premiseId == premiseId && i.typeId == notificationType)
            .select(i => i.sendingDay)
            .toArray()[0]
    }

    async savePremise() {
        if (this.isNewRecord) {

            await this.premisesService.createPremise(this.editedPremise).toPromise();
            this.premises = await this.loadPremises();

            this.isNewRecord = false;
            this.editedPremise = null;
        } else {

            await this.premisesService.updatePremise(this.editedPremise).toPromise();
            this.editedPremise = null;

            this.premises = await this.loadPremises();
        }
    }

    cancel() {

        if (this.isNewRecord) {
            this.premises.pop();
            this.isNewRecord = false;
        }

        this.editedPremise = null;
    }

    deletePremise(premiseId: number) {

        this.premisesService.deletePremise(premiseId).subscribe(async data => {
            this.premises = await this.loadPremises();
        });
    }
}
