import { Component } from '@angular/core';
import { SwalMessages } from '../../../commons/_dto/swal-messages';
import { DtoProductList } from '../../../product/_dto/dto-product-list';
import { ProductImage } from '../../../product/_model/product-image';
import { ProductImageService } from '../../../product/_service/product-image.service';
import { ProductService } from '../../../product/_service/product.service';
import { Router } from '@angular/router';
import { CategoryService } from '../../_service/category.service';
import { Category } from '../../_model/category';

@Component({
  selector: 'app-product-client',
  templateUrl: './product-client.component.html',
  styleUrl: './product-client.component.css'
})
export class ProductClientComponent {
  
  categories: Category[] = [];
  products: DtoProductList[] = []; // arreglo original
  productsFound: DtoProductList[] = []; // productos encontrados, para no modificar el original
  swal: SwalMessages = new SwalMessages();
  logo: String = "../../../../assets/icons8-logo.svg";

  // Texto de la barra de busqueda
  searchQuery: String = '';

  // Categoria seleccionada
  selectQuery: String = '-1';

  // Product not found status
  productNotFound: boolean = false;


  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private productImageService: ProductImageService,    
    private router: Router,
  ){}

  ngOnInit(){
    this.getProducts();
    this.getActiveCategories();
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
        // Copia del arreglo de productos
        this.productsFound = [... this.products];
      },
      error: (e) => {
        console.log(e);
        this.swal.errorMessage(e.error!.message); // show message
      }
    });
  }

  showProduct(gtin: string){
    this.router.navigate(['producto-detail/' + gtin]);
  }

  searchProduct(){
    if (this.searchQuery.trim() === ''){
      this.productsFound = [... this.products];
    }else{
      // Filtramos por nombre de producto
      this.productsFound = this.products.filter(product => {
        return product.product.toLowerCase().includes(this.searchQuery.toLowerCase());
      });
      if (this.productsFound.length === 0){
        this.productNotFound = true;
      }else{
        this.productNotFound = false;
      }
    }
  }

  searchProductByCategory(){
    if (this.selectQuery === '-1'){
      this.productsFound = [... this.products];
    }else{
      // Filtramos por categoria
      this.productsFound = this.products.filter(product => {
        return product.category_id === Number(this.selectQuery);
      });
      if (this.productsFound.length === 0){
        this.productNotFound = true;
      }else{
        this.productNotFound = false;
      }
    }
  }

  getActiveCategories(){
    this.categoryService.getActiveCategories().subscribe({
      next: (v) => {
        this.categories = v.body!;
      },
      error: (e) => {
        console.log(e);
        this.swal.errorMessage(e.error!.message); // show message
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
