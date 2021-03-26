import { BaseResponse } from './base-response';

export type VisitData = {
    Time: string;
    Name: string
    Action: string;
}

export class Visit {
    VisitId: number;
    CustomerId: string;
    BirthYear: number;
    Gender: string;
    Data: VisitData[];
}

export class AnomalyVisitsResponse extends BaseResponse {
    visitList: Visit[];
}
