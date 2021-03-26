import { BaseResponse } from './base-response';

export class Product {

    constructor(
        productId: number,
        name: string,
        storeId: number,
        price: number,
        shelf: string,
    ) {
        this.productId = productId;
        this.name = name;
        this.storeId = storeId;
        this.price = price;
        this.shelf = shelf;
    }

    productId: number;
    name: string;
    storeId: number;
    price: number;
    shelf: string;
}

export class ProductsResponse extends BaseResponse {

    products: Product[];
}
