import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ProductsService } from '../products.service';
import { AppStateService } from '../../../../app-state.service';
import { Product } from '../../../../responses/product-response';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {

    @ViewChild('readOnlyTemplate', { static: false }) readOnlyTemplate: TemplateRef<any>;
    @ViewChild('editTemplate', { static: false }) editTemplate: TemplateRef<any>;

    editedProduct: Product;
    products: Product[];
    isNewRecord: boolean;

    constructor(
        private appStateService: AppStateService,
        private productsService: ProductsService,
    ) {}

    ngOnInit() {

        this.loadProducts();
    }

    get appState() { return this.appStateService.appState; }

    private loadProducts() {

        this.productsService.getProducts()
            .subscribe(response => {

                this.products = response.products;
            });
    }

    addProduct() {
        this.editedProduct = new Product(null, null, this.appState.storeId, 0, null);
        this.products.push(this.editedProduct);
        this.isNewRecord = true;
    }

    editProduct(product: Product) {

        this.editedProduct = new Product(
            product.productId,
            product.name,
            product.storeId,
            product.price,
            product.shelf,
        );
    }

    isEditMode(product: Product) {

        return this.editedProduct && this.editedProduct.productId === product.productId;
    }

    saveProduct() {
        if (this.isNewRecord) {

            this.productsService.createProduct(this.editedProduct).subscribe(data => this.loadProducts());

            this.isNewRecord = false;
            this.editedProduct = null;
        }
        else {

            this.productsService.updateProduct(this.editedProduct).subscribe(data => this.loadProducts());

            this.editedProduct = null;
        }
    }

    cancel() {

        if (this.isNewRecord) {
            this.products.pop();
            this.isNewRecord = false;
        }

        this.editedProduct = null;
    }

    deleteProduct(productId: number) {

        this.productsService.deleteProduct(productId).subscribe(data => this.loadProducts());
    }
}
