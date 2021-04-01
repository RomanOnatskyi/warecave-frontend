import { BaseResponse } from './base-response';

export class ChartData {
    day: string;
    rentAmount: number;
}

export class RentChartResponse extends BaseResponse {
    recordList: ChartData[];
}
