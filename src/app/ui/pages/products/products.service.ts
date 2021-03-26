import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AppStateService } from '../../../app-state.service';
import { catchError } from 'rxjs/operators';
import { HandleError } from '../../../handle-error';
import { Product, ProductsResponse } from '../../../responses/product-response';

@Injectable({
    providedIn: 'root',
})
export class ProductsService {

    constructor(
        private http: HttpClient,
        private appStateService: AppStateService,
    ) {
    }

    get appState() { return this.appStateService.appState; }

    getProducts() {

        const headers = new HttpHeaders({ 'authorization': this.appState.userToken });

        return this.http.get<ProductsResponse>(`${this.appState.baseUrl}/good/${this.appState.storeId}`, { headers }).pipe(
            catchError(HandleError<ProductsResponse>('Getting products')),
        );
    }

    createProduct(product: Product) {

        const headers = new HttpHeaders({ 'authorization': this.appState.userToken });

        return this.http.post<ProductsResponse>(`${this.appState.baseUrl}/good/${this.appState.storeId}`, product,{ headers }).pipe(
            catchError(HandleError<ProductsResponse>('Product creating')),
        );
    }

    deleteProduct(productId: number) {

        const headers = new HttpHeaders({ 'authorization': this.appState.userToken });

        return this.http.delete<ProductsResponse>(`${this.appState.baseUrl}/good/single/${productId}`, { headers }).pipe(
            catchError(HandleError<ProductsResponse>('Product creating')),
        );
    }

    updateProduct(product: Product) {

        const headers = new HttpHeaders({ 'authorization': this.appState.userToken });

        return this.http.post<ProductsResponse>(`${this.appState.baseUrl}/good/single/${product.productId}`, product,{ headers }).pipe(
            catchError(HandleError<ProductsResponse>('Product creating')),
        );
    }
}
