import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RentChartComponent } from './rent-chart/rent-chart.component';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
    declarations: [RentChartComponent],
    imports: [
        CommonModule,
        FormsModule,
        TranslateModule,
    ],
})
export class RentChartModule {
}
