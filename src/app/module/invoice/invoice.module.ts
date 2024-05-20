import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceComponent } from './component/invoice/invoice.component';
import { CartDetailComponent } from './component/cart-detail/cart-detail.component';



@NgModule({
  declarations: [
    InvoiceComponent,
    CartDetailComponent
  ],
  imports: [
    CommonModule
  ]
})
export class InvoiceModule { }
