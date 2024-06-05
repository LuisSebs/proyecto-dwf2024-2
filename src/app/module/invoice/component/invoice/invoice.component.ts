import { Component } from '@angular/core';
import { SwalMessages } from '../../../commons/_dto/swal-messages';
import { DtoInvoiceList } from '../../_dto/dto-invoice-list';
import { InvoiceService } from '../../_service/invoice.service';

declare var $: any; // JQuery

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.css'
})
export class InvoiceComponent {

  invoices: DtoInvoiceList[] = []; // Invoice list

  swal: SwalMessages = new SwalMessages(); // swal messages

  constructor(
    private invoiceService: InvoiceService,
  ){}

  ngOnInit(){
    this.getInvoices();
  }

  getInvoices(){
    this.invoiceService.getInvoices().subscribe({
      next: (v) => {
        this.invoices = v.body!;
      },
      error: (e) => {
        console.log(e);
        this.swal.errorMessage(e.error!.message); // show message
      }
    });
  }

  formatCurrency(value: number): string {
    // Formatear el valor a la moneda deseada
    return '$' + value.toFixed(2);
  }

  formatDate(dateString: string): string {
    // Convertir la cadena de fecha a un objeto Date
    const date = new Date(dateString);
    // Formatear la fecha a un formato deseado
    return date.toLocaleDateString('en-US');
  }

  verFactura(){
    alert("Falta implementar ver detalles de factura");
  }
}