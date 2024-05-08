import { Component } from '@angular/core';
import { SwalMessages } from '../../../commons/_dto/swal-messages';
import { DtoProductList } from '../../../product/_dto/dto-product-list';
import { ProductImage } from '../../../product/_model/product-image';
import { ProductImageService } from '../../../product/_service/product-image.service';
import { ProductService } from '../../../product/_service/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  products: DtoProductList[] = [];
  swal: SwalMessages = new SwalMessages();
  logo: String = "../../../../assets/icons8-logo.svg";

  constructor(
    private productService: ProductService,
    private productImageService: ProductImageService,
    private router: Router,
  ){}

  ngOnInit(){
    // this.getProducts();
  }

  getProducts(){
    this.productService.getProducts().subscribe({
      next: (v) => {
        this.products = v.body!;
        // Agregamos las imagenes
        this.products.map(product => {
          let images = this.productImageService.getProductImages(product.product_id).subscribe({
            next: (v) => {
              product.image = v.body![0];              
              // console.log(product.image);
            },
            error: (e) => {
              console.log(e);
              this.swal.errorMessage(e.error!.message); // show message
            }
          })

        })
      },
      error: (e) => {
        console.log(e);
        this.swal.errorMessage(e.error!.message); // show message
      }
    });
  }

  showProduct(gtin: string){
    this.router.navigate(['producto/' + gtin]);
  }
}
