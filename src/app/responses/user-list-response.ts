import { BaseResponse } from './base-response';
import { UserRole } from '../app-state.service';

export class User {
    id: number;
    login: string;
    password: string;
    userRole: UserRole
}

export class UserListResponse extends BaseResponse {
    userList: User[];
}


