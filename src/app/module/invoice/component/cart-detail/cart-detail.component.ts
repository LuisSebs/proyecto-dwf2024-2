import { Component } from '@angular/core';
import { Product } from '../../../product/_model/product';
import { DtoCartDetails } from '../../_dto/dto-cart-details';
import { CartService } from '../../_service/cart.service';
import { SwalMessages } from '../../../commons/_dto/swal-messages';
import { ProductImageService } from '../../../product/_service/product-image.service';

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
  ) {}

  ngOnInit(){
    this.getCart();

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

  click(){
    alert("Falta implementar el componente de factura");
  }

}
