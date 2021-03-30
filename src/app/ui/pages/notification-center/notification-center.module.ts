import { NgModule } from '@angular/core';
import { NotificationCenterComponent } from './notification-center/notification-center.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        NotificationCenterComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
    ],
})
export class NotificationCenterModule {}
