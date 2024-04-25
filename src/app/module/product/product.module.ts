import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './component/category/category.component';
import  { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductComponent } from './component/product/product/product.component';
import { NgxPhotoEditorModule } from 'ngx-photo-editor';
import { ProductDetailComponent } from './component/product-detail/product-detail.component';

@NgModule({
  declarations: [
    CategoryComponent,
    ProductDetailComponent,
    ProductComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPhotoEditorModule
  ]
})
export class ProductModule { }
