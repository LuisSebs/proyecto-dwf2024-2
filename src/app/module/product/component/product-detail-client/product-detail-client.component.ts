import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SwalMessages } from '../../../commons/_dto/swal-messages';
import { Product } from '../../_model/product';
import { ProductImage } from '../../_model/product-image';
import { CategoryService } from '../../_service/category.service';
import { ProductImageService } from '../../_service/product-image.service';
import { ProductService } from '../../_service/product.service';
import { Cart } from '../../../invoice/_model/cart';
import { CartService } from '../../../invoice/_service/cart.service';

@Component({
  selector: 'app-product-detail-client',
  templateUrl: './product-detail-client.component.html',
  styleUrl: './product-detail-client.component.css'
})
export class ProductDetailClientComponent {

  product: Product = new Product();
  gtin: string = "";
  productImgs: ProductImage[] = [];
  imageDefault: String = "../../../../../../../assets/images/user-logo-default.png";
  swal: SwalMessages  = new SwalMessages();  
  max: number[] = []; // Cantidad permitida
  selectQuery: number = 1;

  constructor(
    private productService: ProductService,
    private productImageService: ProductImageService,
    private categoryService: CategoryService,
    private cartService: CartService,
    private router: Router,
    private route: ActivatedRoute,    
  ){}

  ngOnInit(){
    this.gtin = this.route.snapshot.paramMap.get('gtin')!;
    if(this.gtin){
      this.getProduct();
    }else{
      this.swal.errorMessage("GTIN inválido"); // show message
    }
  }

  getProduct(){
    this.productService.getProduct(this.gtin).subscribe({
      next: (v) => {
        this.product = v.body!;
        this.max = this.product.stock > 0 ? Array.from({length: this.product.stock}, (_, i) => i + 1) : []
        this.getProductImages();
      },
      error: (e) => {
        console.log(e);
        this.swal.errorMessage(e.error!.message); // show message
      }
    });
  }

  getProductImages(){
    this.productImageService.getProductImages(this.product.product_id).subscribe({
      next: (v) => {
        this.productImgs = v.body!;   
        console.log(this.product);
        console.log(this.productImgs);
      },
      error: (e) => {
        console.log(e);
        this.swal.errorMessage(e.error!.message); // show message
      }
    })
  }  

  priceFormat(price: number){
    // Convierte el número a una cadena y lo formatea con separadores de miles y dos decimales
    const precioFormateado = price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    // Retorna la cadena con el símbolo de la moneda y el formato deseado
    return `$ ${precioFormateado}`;
  }

  addToCart(){
    console.log(this.selectQuery)
    this.cartService.addToCart({ gtin: this.product.gtin, quantity: this.selectQuery }).subscribe({
      next: (v) => {
        console.log(v.body!.message)
      },
      error: (e) => {
        console.log(e.error!.message);
      }
    });
  }

}
