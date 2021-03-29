import { BaseResponse } from './base-response';

export class Premise {

    constructor(
        premiseId: number,
        name: string,
        area: number,
        address: string,
        rentAmount: number,
        subrenterId: number,
        annotation: string,
    ) {
        this.premiseId = premiseId;
        this.name = name;
        this.area = area;
        this.address = address;
        this.rentAmount = rentAmount;
        this.annotation = annotation;
        this.subrenterId = subrenterId;
    }

    premiseId: number;
    name: string;
    area: number;
    address: string;
    rentAmount: number;
    annotation: string;
    subrenterId: number;
    subrenterLogin: string;
    temperature: number;
    relativeHumidity: number;
}

export class PremisesResponse extends BaseResponse {

    premises: Premise[];
}
