import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
    declarations: [UserListComponent],
    imports: [
        CommonModule,
        TranslateModule,
    ],
})
export class UserListModule {
}
