import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { SignInUser, SignUpUser } from '../../users';
import { UserRole } from '../../../../../app-state.service';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';

export type AuthAction = "sign-up" | "sign-in";

@Component({
    selector: 'app-auth-content',
    templateUrl: './auth-content.component.html',
    styleUrls: ['./auth-content.component.css'],
})
export class AuthContentComponent implements OnInit {

    @Input() action: AuthAction;
    @Input() user: SignInUser | SignUpUser;
    @Input() processing: boolean;
    @Input() captchaId: string;
    @Input() authError: string;
    @Input() captchaError: string;

    @Output() updateCaptcha = new EventEmitter<void>();
    @Output() dismissAuthError = new EventEmitter<void>();
    @Output() dismissCaptchaError = new EventEmitter<void>();
    @Output() submit = new EventEmitter<void>();

    get signUp() { return this.action == "sign-up"; }
    get signIn() { return this.action == "sign-in"; }

    constructor(
        private translate: TranslateService,
    ) {}

    ngOnInit() {

        if (this.user instanceof SignUpUser) {
            this.user.roleId = UserRole.Entrepreneur;
        }

        this.translate.stream('authorization.users.entrepreneur').subscribe((res: string) => {
            this.users[0].name = res;
        });

        this.translate.stream('authorization.users.subrenter').subscribe((res: string) => {
            this.users[1].name = res;
        });
    }

    users = [
        { name: "", value: UserRole.Entrepreneur },
        { name: "", value: UserRole.Subrenter },
    ];
}
