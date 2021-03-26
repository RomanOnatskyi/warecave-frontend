import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class AppStateService {

    private state = new AppState();

    get appState() { return this.state; }
}

export class AppState {

    baseUrl = "http://localhost:3300/api";

    currentUser: UserRole = UserRole.Unauthorized;
    userToken: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIwLCJpYXQiOjE2MDcwMTk3MzB9.UYCTHHTfrNN_9lDHnpGDvQ6Ldb1xWTjUKMshdmKwUaY";
    storeId: number = 1;
    currentPage: Pages;
}

export enum UserRole {

    Unauthorized = 0,
    Analyst = 1,
    StoreAdmin = 2,
    SystemAdmin = 3,
}

export enum Pages {

    Authentication,
    Registration,
    Products,
    SellsChart,
    AnomalyVisits,
    UserList,
}
