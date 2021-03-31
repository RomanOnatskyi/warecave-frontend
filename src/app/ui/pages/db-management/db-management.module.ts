import { NgModule } from '@angular/core';
import { DbManagementComponent } from './db-management/db-management.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        DbManagementComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
    ],
})
export class DbManagementModule {}
