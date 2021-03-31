import { NgModule } from '@angular/core';
import { DbManagementComponent } from './db-management/db-management.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [
        DbManagementComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        TranslateModule,
    ],
})
export class DbManagementModule {}
