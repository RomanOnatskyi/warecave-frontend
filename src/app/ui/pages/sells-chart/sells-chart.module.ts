import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellsChartComponent } from './sells-chart/sells-chart.component';
import { FormsModule } from '@angular/forms';


@NgModule({
    declarations: [SellsChartComponent],
    imports: [
        CommonModule,
        FormsModule,
    ],
})
export class SellsChartModule {
}
