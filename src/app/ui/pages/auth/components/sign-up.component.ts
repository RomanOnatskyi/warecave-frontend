import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppStateService, Pages } from '../../../../app-state.service';
import { AuthService } from '../auth.service';
import { AuthResponse } from '../../../../responses/auth-response';
import { SignUpUser } from '../users';

@Component({
    selector: 'app-sign-up',
    template: `
        <app-auth-content
            action="sign-up"
            [user]="user"
            [processing]="processing"
            [authError]="authError"
            (dismissAuthError)="authError = null"
            (submit)="submit()">
        </app-auth-content>`,
})
export class SignUpComponent {

    constructor(
        private router: Router,
        private appStateService: AppStateService,
        private authService: AuthService,
    ) {}

    user = new SignUpUser();
    processing: boolean = false;
    authError: string = null;
    pages = Pages;

    submit() {

        this.processing = true;
        this.user.storeId = this.appStateService.appState.storeId;

        this.authService.signUp(this.user)
            .subscribe(response => this.handleAuthResponse(response));
    }

    private handleAuthResponse(response: AuthResponse) {

        this.authError = response.errors;
        this.processing = false;

        if (this.authError) {
            window.scrollTo(0, 0);
            return;
        }

        this.appStateService.appState.currentPage = this.pages.UserList;
        this.router.navigateByUrl('user-list');
    }
}
