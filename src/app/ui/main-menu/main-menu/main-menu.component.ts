import { Component, Inject } from '@angular/core';
import { AppStateService, Pages, UserRole } from '../../../app-state.service';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'app-main-menu',
    templateUrl: './main-menu.component.html',
    styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent {

    constructor(
        public appStateService: AppStateService,
        private router: Router,
        @Inject(DOCUMENT) private _document: Document,
    ) {
    }

    get currentUser() {
        return this.appStateService.appState.currentUser;
    }

    get currentPage() {
        return this.appStateService.appState.currentPage;
    }

    pages = Pages;
    userRole = UserRole;

    refreshPage() {
        this.router.navigateByUrl('auth/sign-in').then(r => {
            this._document.defaultView.location.reload();
        });
    }
}
