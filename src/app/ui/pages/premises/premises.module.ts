import { NgModule } from '@angular/core';
import { PremisesComponent } from './premises/premises.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
    declarations: [
        PremisesComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        NgSelectModule,
    ],
})
export class PremisesModule {}
