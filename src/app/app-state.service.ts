import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class AppStateService {

    private state = new AppState();

    get appState() { return this.state; }
}

export class AppState {

    baseUrl = "http://192.168.0.106:3300/api";

    currentUser: UserRole = UserRole.Unauthorized;
    userToken: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIwLCJpYXQiOjE2MDcwMTk3MzB9.UYCTHHTfrNN_9lDHnpGDvQ6Ldb1xWTjUKMshdmKwUaY";
    renterId: number = 1;
    currentPage: Pages;
    hasUnreadNotifications: boolean;
}

export enum UserRole {

    Unauthorized = 0,
    Admin = 1,
    Entrepreneur = 2,

    StoreAdmin = 3,
    SystemAdmin = 3,
    Analyst = 3,
}

export enum Pages {

    Authentication,
    Registration,
    Premises,
    SellsChart,
    AnomalyVisits,
    UserList,
}
