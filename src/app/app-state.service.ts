import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class AppStateService {

    private state = new AppState();

    get appState() { return this.state; }
}

export class AppState {

    baseUrl = environment.apiUrl;

    currentUser: UserRole = UserRole.Unauthorized;
    userToken: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTYxNTMwOTUwMX0.-l5s_cKlmMW-4-Ncd8ZrOc1r-5JFzet-JznhidjTy-M";
    renterId: number = 1;
    currentPage: Pages;
    hasUnreadNotifications: boolean;
}

export enum UserRole {

    Unauthorized = 0,
    Admin = 1,
    Entrepreneur = 2,
    Subrenter = 3,

    StoreAdmin = 4,
    SystemAdmin = 5,
    Analyst = 6,
}

export enum Pages {

    Authentication,
    Registration,
    Premises,
    NotificationCenter,
    SellsChart,
    UserList,
    DbManagement,
}
