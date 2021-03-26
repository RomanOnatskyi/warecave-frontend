import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { SignInUser, SignUpUser } from './users';
import { AppStateService, UserRole } from '../../../app-state.service';
import { AuthResponse } from '../../../responses/auth-response';
import { HandleError } from '../../../handle-error';

@Injectable({
    providedIn: 'root',
})
export class AuthService {

    constructor(
        private http: HttpClient,
        private appStateService: AppStateService,
    ) {}

    get appState() { return this.appStateService.appState; }

    signUp(user: SignUpUser) {

        if (user.userRole == UserRole.Analyst) {

            return this.http.post<AuthResponse>(`${this.appState.baseUrl}/sign-up/analyst`, user).pipe(
                catchError(HandleError<AuthResponse>('Signing up')),
            );
        }

        if (user.userRole == UserRole.StoreAdmin) {

            return this.http.post<AuthResponse>(`${this.appState.baseUrl}/sign-up/store-admin`, user).pipe(
                catchError(HandleError<AuthResponse>('Signing up')),
            );
        }
    }

    signIn(user: SignInUser) {

        return this.http.post<AuthResponse>(`${this.appState.baseUrl}/sign-in`, user).pipe(
            catchError(HandleError<AuthResponse>('Signing in')),
        );
    }
}
