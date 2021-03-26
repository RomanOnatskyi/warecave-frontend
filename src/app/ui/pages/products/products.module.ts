import { NgModule } from '@angular/core';
import { ProductsComponent } from './products/products.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        ProductsComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
    ],
})
export class ProductsModule {}
