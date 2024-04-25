import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Product } from '../../_model/product';
import { Category } from '../../_model/category';
import { ProductImage } from '../../_model/product-image';
import { ProductService } from '../../_service/product.service';
import { CategoryService } from '../../_service/category.service';
import { ProductImageService } from '../../_service/product-image.service';
import { NgxPhotoEditorService } from 'ngx-photo-editor';
import Swal from'sweetalert2';
import { SwalMessages } from '../../../commons/_dto/swal-messages';

declare var $: any; // JQuery

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {
  product: Product = new Product();
  categories: Category[] = [];
  imageDefault: String = "../../../../../../../assets/images/user-logo-default.png";
  productImgs: ProductImage[] = [];
  

  gtin: string = "";

    // Product form
  form = this.formBuilder.group({
    product: ["", [Validators.required]],
    gtin: ["", [Validators.required, Validators.pattern('^[0-9]{13}$')]],
    description: ["", [Validators.required]],
    price: [0, [Validators.required, Validators.pattern('^[0-9]*$')]],
    stock: [0, [Validators.required, Validators.pattern('^[0-9]*$')]],
    category_id: [0, [Validators.required]],
    status: [0, [Validators.required, Validators.pattern('^[0-1]*$')]],
  });

  submitted = false; // Variable para saber si el formulario ha sido enviado
  swal: SwalMessages = new SwalMessages(); // swal messages

  redirect(url: string[]){
    this.router.navigate(url);
  }

  constructor(
    private productService: ProductService,
    public productImageService: ProductImageService,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router, // router por si queremos redirigir a otro componente

    private service: NgxPhotoEditorService
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
        this.getProductImages();
      },
      error: (e) => {
        console.log(e);
        this.swal.errorMessage(e.error!.message); // show message
      }
    });
  }

  getProductImages(){
    this.productImageService.getProductImages(this.product.category_id).subscribe({
      next: (v) => {
        this.productImgs = v.body!;
        console.log(this.productImgs)
      },
      error: (e) => {
        console.log(e);
        this.swal.errorMessage(e.error!.message); // show message
      }
    });
  }

  fileChangeHandler($event: any) {
    this.service.open($event, {
      aspectRatio: 1/1,
      autoCropArea: 1,
      resizeToWidth: 360,
      resizeToHeight: 360,
    }).subscribe(data => {
      this.updateProductImage(data.base64!);
    });
  }

  updateProductImage(image: string){
    let productImage: ProductImage = new ProductImage();
    productImage.product_image_id = this.product.image.product_image_id;
    productImage.image = image;

    this.productImageService.updateProductImage(productImage).subscribe({
      next: (v) => {
        this.swal.successMessage(v.body!.message); // show message
        this.getProduct(); // reload customer
        this.hideModalForm(); // close modal
      },
      error: (e) => {
        console.error(e);
        this.swal.errorMessage(e.error!.message); // show message
      }
    });
  }

  hideModalForm(){
    $("#modalForm").modal("hide")
  }

  showModalForm(){
    $("#modalForm").modal("show")
  }
}
