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
        console.log("this.notificationData:", this.notificationData);

        // todo linq here
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
        );
    }

    isEditMode(premise: Premise) {

        return this.editedPremise && this.editedPremise.premiseId === premise.premiseId;
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

        this.premisesService.deletePremise(premiseId).subscribe(data => this.loadPremises());
    }
}
