import { Component } from '@angular/core';
import { SwalMessages } from '../../../commons/_dto/swal-messages';
import { DtoProductList } from '../../../product/_dto/dto-product-list';
import { ProductImage } from '../../../product/_model/product-image';
import { ProductImageService } from '../../../product/_service/product-image.service';
import { ProductService } from '../../../product/_service/product.service';
import { ActivatedRoute, Router } from '@angular/router';
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

  // Categoria
  categoria: number | null = null;
  busqueda: string | null = null;

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private productImageService: ProductImageService,    
    private router: Router,
    private route: ActivatedRoute,
  ){}

  ngOnInit(){
    this.route.paramMap.subscribe(params => {
      const category_id = params.get('category_id');
      const entrada = params.get('entrada');

      if (category_id !== null) {
        this.categoria = parseInt(category_id);
        this.busqueda = null;
        this.getProductsByCategory();
      } else if (entrada !== null) {
        this.categoria = null;
        this.busqueda = entrada;
        this.getProductsBySearch();
      }
    });
  }

  getProductsByCategory(){
    this.productService.getProductsByCategory(this.categoria!).subscribe({
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
        // this.swal.errorMessage(e.error!.message); // show message
        this.swal.errorMessage("Lo sentimos, nuestros servidores estan caidos, intente más tarde");
      }
    });
  }

  getProductsBySearch(){
    this.productService.getActiveProducts().subscribe({
      next: (v) => {
        this.products = v.body!;
        this.productsFound = this.products.filter(product => {
          return product.product.toLowerCase().includes(this.busqueda!.toLowerCase());
        });
        if (this.productsFound.length === 0){
          this.productNotFound = true;
        }else{
          this.productsFound.map(product => {
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
          this.productNotFound = false;
        }
      },
      error: (e) => {
        console.log(e.error!.message)
      }
    });
  }

  showProduct(gtin: string){
    this.router.navigate(['producto-detail/' + gtin]);
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
