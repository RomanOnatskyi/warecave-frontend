import { Component, OnInit } from '@angular/core';
import { NotificationCenterService } from '../notification-center.service';
import { AppStateService } from '../../../../app-state.service';
import { Visit } from '../../../../responses/anomaly-visits-response';

@Component({
    selector: 'app-anomaly-visits',
    templateUrl: './notification-center.component.html',
    styleUrls: ['./notification-center.component.css'],
})
export class NotificationCenterComponent implements OnInit {

    constructor(
        private appStateService: AppStateService,
        private anomalyVisitsService: NotificationCenterService,
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
