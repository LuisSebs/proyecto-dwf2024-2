import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './component/category/category.component';
import  { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductComponent } from './component/product/product/product.component';
import { NgxPhotoEditorModule } from 'ngx-photo-editor';
import { ProductDetailComponent } from './component/product-detail/product-detail.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProductClientComponent } from './component/product-client/product-client.component';
import { ProductDetailClientComponent } from './component/product-detail-client/product-detail-client.component';

@NgModule({
  declarations: [
    CategoryComponent,
    ProductDetailComponent,
    ProductComponent,
    ProductClientComponent,
    ProductDetailClientComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPhotoEditorModule,
    FontAwesomeModule
  ]
})
export class ProductModule { }
