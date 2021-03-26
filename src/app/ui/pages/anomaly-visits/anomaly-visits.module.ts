import { NgModule } from '@angular/core';
import { AnomalyVisitsComponent } from './anomaly-visits/anomaly-visits.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        AnomalyVisitsComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
    ],
})
export class AnomalyVisitsModule {}
