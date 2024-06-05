import { Component } from '@angular/core';
import { DtoCartDetails } from '../../_dto/dto-cart-details';
import { CartService } from '../../_service/cart.service';
import { SwalMessages } from '../../../commons/_dto/swal-messages';
import { ProductImageService } from '../../../product/_service/product-image.service';
import { InvoiceService } from '../../_service/invoice.service';
import Swal from 'sweetalert2';

declare var $: any;

@Component({
  selector: 'app-cart-detail',
  templateUrl: './cart-detail.component.html',
  styleUrl: './cart-detail.component.css'
})
export class CartDetailComponent {

  // Recursos
  imageDefault: string = "../../../../../assets/images/user-logo-default.png";

  // Atributos
  products: DtoCartDetails[] = [];
  total: number = 0;

  // Imports
  swal: SwalMessages = new SwalMessages();

  constructor(
    private cartService : CartService,
    private productImageService: ProductImageService,
    private invoiceService: InvoiceService,
  ) {}

  ngOnInit(){
    this.getCart();

    // this.invoiceService.getCustomerDetail();

    // Mostrar mensaje al terminar de recargar la pagina
    const urlParams = new URLSearchParams(window.location.search);
    const deletedMessage = sessionStorage.getItem('deletedMessage');
    if(urlParams.get('deleted') === 'true' && deletedMessage){
      this.swal.successMessage(deletedMessage);
      // Eliminamos los parametros de la URL
      urlParams.delete('deleted');
      const newUrl = `${window.location.pathname}?${urlParams.toString()}`
      window.history.replaceState({}, '', newUrl); // Mantenemos limpio el historial

      // Eliminamos los mensajes de la sesion
      sessionStorage.removeItem('deletedMessage');
    }
    const purchasedMessage = sessionStorage.getItem('purchasedMessage');
    if(urlParams.get('purchased') === 'true' && purchasedMessage){
      this.swal.successMessage(purchasedMessage);
      urlParams.delete('purchased');
      const newUrl = `${window.location.pathname}?${urlParams.toString()}`
      window.history.replaceState({}, '', newUrl);
      sessionStorage.removeItem('purchasedMessage');
    }
  }

  getCart(){
    this.cartService.getCart().subscribe({
      next: (v) => {
        this.products = v.body!;      
        this.products.map(product => {
          this.total+= (product.product.price * product.quantity);
        });  
        console.log(this.products)
      },
      error: (e) => {
        this.swal.errorMessage(e.error!.message);
      }
    });
  }

  removeFromCart(cart_id: any){
    this.cartService.removeFromCart(cart_id).subscribe({
      next: (v) => {
        sessionStorage.setItem('deletedMessage', v.body!.message);
        const url = new URL(window.location.href);   
        url.searchParams.set('deleted', 'true');    
        window.location.href = url.toString();            
      },
      error: (e) => {
        this.swal.errorMessage(e.error!.message);
      }
    });
  }

  clearCart(){
    this.swal.confirmMessage.fire({
      title: '¿Estas seguro que quieres eliminar estos productos?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Confirmar',
    }).then((result: any) => {
      if (result.isConfirmed){
        this.cartService.clearCart().subscribe({
          next: (v) => {
            sessionStorage.setItem('deletedMessage', v.body!.message);
            const url = new URL(window.location.href);   
            url.searchParams.set('deleted', 'true');    
            window.location.href = url.toString();  
          },
          error: (e) => {
            this.swal.errorMessage(e.error!.message);
          }
        });
      }
    });
  }

  priceFormat(price: number){
    // Convierte el número a una cadena y lo formatea con separadores de miles y dos decimales
    const precioFormateado = price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    // Retorna la cadena con el símbolo de la moneda y el formato deseado
    return `$ ${precioFormateado}`;
  }

  getAmountOfProducts() {
    let total = 0;
    for (let product of this.products) {
      total += product.quantity!;
    }
    return total;
  }

  finishPurchase(){
    // Preguntamos si se desea finalizar la compra y limpiamos el carrito de ser necesario.
    Swal.fire({
      title: "¿Está seguro que desea finalizar la compra?",
      showCancelButton: true,
      confirmButtonText: "Aceptar",
      cancelButtonText: `Cancelar`
    }).then((result) => {
      if (result.isConfirmed) {
        this.hideModalForm();
        this.invoiceService.generateInvoice().subscribe(
          (res) => {
            this.cartService.clearCart();
            //this.getCart();
            sessionStorage.setItem('purchasedMessage', res.message);
            const url = new URL(window.location.href)
            url.searchParams.set('purchased', 'true');
            window.location.href = url.toString();   
            // this.swal.successMessage('Factura generada satisfactoriamente.');            
          },
          (err) => {
            this.swal.errorMessage('Un error ha ocurrido al generar la factura.');
          }
        )
      }
    });
  }

  showModal(){
    $("#modalForm").modal("show");
  }

  hideModalForm(){
    $("#modalForm").modal("hide")
  }
}
