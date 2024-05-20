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

  priceFormat(price: number){
    // Convierte el número a una cadena y lo formatea con separadores de miles y dos decimales
    const precioFormateado = price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    // Retorna la cadena con el símbolo de la moneda y el formato deseado
    return `$ ${precioFormateado}`;
  }

}
