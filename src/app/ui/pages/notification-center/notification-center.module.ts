import { NgModule } from '@angular/core';
import { NotificationCenterComponent } from './notification-center/notification-center.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [
        NotificationCenterComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        TranslateModule,
    ],
})
export class NotificationCenterModule {}
