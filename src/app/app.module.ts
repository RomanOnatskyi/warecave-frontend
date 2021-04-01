import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderModule } from './ui/header/header.module';
import { FooterModule } from './ui/footer/footer.module';
import { MainModule } from './ui/pages/main/main.module';
import { AuthModule } from './ui/pages/auth/auth.module';
import { MainMenuModule } from './ui/main-menu/main-menu.module';
import { RentChartModule } from './ui/pages/rent-chart/rent-chart.module';
import { PremisesModule } from './ui/pages/premises/premises.module';
import { NotificationCenterModule } from './ui/pages/notification-center/notification-center.module';
import { UserListModule } from './ui/pages/user-list/user-list.module';
import { DbManagementModule } from './ui/pages/db-management/db-management.module';


export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        BrowserModule,
        AppRoutingModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            },
            defaultLanguage: 'ua'
        }),

        HeaderModule,
        FooterModule,
        MainModule,

        AuthModule,
        MainMenuModule,
        RentChartModule,
        PremisesModule,
        NotificationCenterModule,
        UserListModule,
        DbManagementModule,
    ],
    providers: [],
    exports: [
        TranslateModule
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
