import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { PremisesService } from '../premises.service';
import { AppStateService } from '../../../../app-state.service';
import { Premise } from '../../../../responses/premise-response';

@Component({
    selector: 'app-premises',
    templateUrl: './premises.component.html',
    styleUrls: ['./premises.component.css'],
})
export class PremisesComponent implements OnInit {

    @ViewChild('readOnlyTemplate', { static: false }) readOnlyTemplate: TemplateRef<any>;
    @ViewChild('editTemplate', { static: false }) editTemplate: TemplateRef<any>;

    editedPremise: Premise;
    premises: Premise[];
    isNewRecord: boolean;

    selectedPersonId: string;
    people = [
        {
            'id': '5a15b13c36e7a7f00cf0d7cb',
            'name': 'Karyn Wright',
        },
        {
            'id': '5a15b13c2340978ec3d2c0ea',
            'name': 'Rochelle Estes',
        },
        {
            'id': '5a15b13c663ea0af9ad0dae8',
            'name': 'Mendoza Ruiz'
        }
    ];

    constructor(
        private appStateService: AppStateService,
        private premisesService: PremisesService,
    ) {}

    ngOnInit() {

        this.loadPremises();
    }

    get appState() { return this.appStateService.appState; }

    private loadPremises() {

        this.premisesService.getPremises()
            .subscribe(response => {

                this.premises = response.premises;
            });
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

    savePremise() {
        if (this.isNewRecord) {

            this.premisesService.createPremise(this.editedPremise).subscribe(data => this.loadPremises());

            this.isNewRecord = false;
            this.editedPremise = null;
        }
        else {

            this.premisesService.updatePremise(this.editedPremise).subscribe(data => this.loadPremises());

            this.editedPremise = null;
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
