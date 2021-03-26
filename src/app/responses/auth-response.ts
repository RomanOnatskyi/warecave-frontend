import { BaseResponse } from './base-response';
import { UserRole } from '../app-state.service';

export class AuthResponse extends BaseResponse {
    token: string;
    roleId: UserRole;
}
