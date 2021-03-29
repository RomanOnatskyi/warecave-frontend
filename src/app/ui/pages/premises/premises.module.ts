import { NgModule } from '@angular/core';
import { PremisesComponent } from './premises/premises.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        PremisesComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
    ],
})
export class PremisesModule {}
