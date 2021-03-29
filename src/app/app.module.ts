import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderModule } from './ui/header/header.module';
import { FooterModule } from './ui/footer/footer.module';
import { MainModule } from './ui/pages/main/main.module';
import { AuthModule } from './ui/pages/auth/auth.module';
import { MainMenuModule } from './ui/main-menu/main-menu.module';
import { SellsChartModule } from './ui/pages/sells-chart/sells-chart.module';
import { PremisesModule } from './ui/pages/premises/premises.module';
import { AnomalyVisitsModule } from './ui/pages/anomaly-visits/anomaly-visits.module';
import { UserListModule } from './ui/pages/user-list/user-list.module';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        BrowserModule,
        AppRoutingModule,

        HeaderModule,
        FooterModule,
        MainModule,

        AuthModule,
        MainMenuModule,
        SellsChartModule,
        PremisesModule,
        AnomalyVisitsModule,
        UserListModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
