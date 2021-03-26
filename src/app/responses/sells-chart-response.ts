import { BaseResponse } from './base-response';

export class ChartData {
    Day: string;
    GoodId: number;
    GoodName: string;
    GoodsCount: number;
    TotalPrice: number;
}

export class SellsChartResponse extends BaseResponse {
    recordList: ChartData[];
}
