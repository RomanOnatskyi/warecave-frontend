import { BaseResponse } from './base-response';

export class Subrenter {
    id: number;
    login: string;
}

export class SubrentersResponse extends BaseResponse{
    subrenters: Subrenter[];
}
