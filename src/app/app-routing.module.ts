import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SignUpComponent } from './ui/pages/auth/components/sign-up.component';
import { SignInComponent } from './ui/pages/auth/components/sign-in.component';
import { PremisesComponent } from './ui/pages/premises/premises/premises.component';
import { AnomalyVisitsComponent } from './ui/pages/anomaly-visits/anomaly-visits/anomaly-visits.component';
import { SellsChartComponent } from './ui/pages/sells-chart/sells-chart/sells-chart.component';
import { UserListComponent } from './ui/pages/user-list/user-list/user-list.component';
import { MainComponent } from './ui/pages/main/main/main.component';

const routes: Routes = [
    { path: '', redirectTo: '/auth/sign-in', pathMatch: 'full' },
    { path: 'auth/sign-up', component: SignUpComponent },
    { path: 'auth/sign-in', component: SignInComponent },
    { path: 'premises', component: PremisesComponent },
    { path: 'anomaly-visits', component: AnomalyVisitsComponent },
    { path: 'sells-chart', component: SellsChartComponent },
    { path: 'user-list', component: UserListComponent },
    { path: 'main', component: MainComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {
}
