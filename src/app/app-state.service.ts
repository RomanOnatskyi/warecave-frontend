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
    userToken: string;
    renterId: number;
    currentPage: Pages;
    hasUnreadNotifications: boolean;
}

export enum UserRole {

    Unauthorized = 0,
    Admin = 1,
    Entrepreneur = 2,
    Subrenter = 3,
}

export enum Pages {

    Authentication,
    Registration,
    Premises,
    NotificationCenter,
    RentChart,
    UserList,
    DbManagement,
}
