import { UserRole } from '../../../app-state.service';

export class SignInUser {
    login: string;
    password: string;
}

export class SignUpUser {
    login: string;
    password: string;
    roleId: UserRole;
}
