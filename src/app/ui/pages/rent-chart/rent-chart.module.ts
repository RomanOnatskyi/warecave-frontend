import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RentChartComponent } from './rent-chart/rent-chart.component';
import { FormsModule } from '@angular/forms';


@NgModule({
    declarations: [RentChartComponent],
    imports: [
        CommonModule,
        FormsModule,
    ],
})
export class RentChartModule {
}
