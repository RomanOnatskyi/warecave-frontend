import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainMenuComponent } from './main-menu/main-menu.component';
import {AppRoutingModule} from '../../app-routing.module';

@NgModule({
    declarations: [MainMenuComponent],
    exports: [
        MainMenuComponent,
    ],
    imports: [
        CommonModule,
        AppRoutingModule,
    ]
})
export class MainMenuModule { }
