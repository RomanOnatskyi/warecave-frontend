import { Component, OnInit } from '@angular/core';
import { AnomalyVisitsService } from '../anomaly-visits.service';
import { AppStateService } from '../../../../app-state.service';
import { Visit } from '../../../../responses/anomaly-visits-response';

@Component({
    selector: 'app-anomaly-visits',
    templateUrl: './anomaly-visits.component.html',
    styleUrls: ['./anomaly-visits.component.css'],
})
export class AnomalyVisitsComponent implements OnInit {

    constructor(
        private appStateService: AppStateService,
        private anomalyVisitsService: AnomalyVisitsService,
    ) {}

    async ngOnInit() {

        this.anomalyVisits = await this.loadAnomalyVisits();
    }

    anomalyVisits: Visit[];

    genders = {
        ['F']: "чоловіча",
        ['M']: "жіноча",
    };

    get appState() { return this.appStateService.appState; }

    private async loadAnomalyVisits() {

        const anomalyVisitsResponse = await this.anomalyVisitsService.getAnomalyVisits().toPromise();
        const error = [anomalyVisitsResponse.errors];

        this.showError(error);

        return anomalyVisitsResponse.visitList;
    }

    async deleteVisit(visitId: number) {
        const response = await this.anomalyVisitsService.deleteVisit(visitId).toPromise();
        const error = [response.errors];

        this.showError(error);

        this.anomalyVisits = await this.loadAnomalyVisits();
    }

    private showError(errors: string[]) {

        for (let i = 0; i < errors.length; i++) {
            if (errors[i]) {
                alert(errors[i]);
            }
        }
    }
}
