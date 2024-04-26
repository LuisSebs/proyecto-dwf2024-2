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
      this.getActiveCategories();
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
      this.uploadProductImage(data.base64!);  
    });
  }

  deleteProductImage(product_image_id: number){
    this.productImageService.deleteProductImage(product_image_id).subscribe({
      next: (v) => {
        this.swal.successMessage(v.body!.message); // show message
        this.getProduct(); // reload product
        this.hideModalForm();
      },
      error: (e) => {
        console.error(e);
        this.swal.errorMessage(e.error!.message); // show message
      }
    })
  }

  uploadProductImage(image: string){
    let productImage: ProductImage = new ProductImage();
    productImage.image = image
    productImage.product_id = this.product.product_id;
    this.productImageService.uploadProductImage(productImage).subscribe({
      next: (v) => {
        this.swal.successMessage(v.body!.message); // show message
        this.getProduct(); // reload product
      },
      error: (e) => {
        console.error(e);
        this.swal.errorMessage(e.error!.message); // show message
      }
    });    
  }

  updateProduct() {
    this.submitted = false;
    this.form.reset();

    // Mostramos los nuevos valores
    this.form.controls['product'].setValue(this.product.product);
    this.form.controls['gtin'].setValue(this.product.gtin);
    this.form.controls['description'].setValue(this.product.description);
    this.form.controls['price'].setValue(this.product.price);
    this.form.controls['stock'].setValue(this.product.stock);
    this.form.controls['description'].setValue(this.product.description);
    this.form.controls['category_id'].setValue(this.product.category_id);
    this.form.controls['status'].setValue(this.product.status);
    $("#modalForm").modal("show");
  }

  getActiveCategories() {
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

  onSubmit() {
    // Falta por implementar
  }

  hideModalForm(){
    $("#modalForm").modal("hide")
  }

  showModalForm(){
    $("#modalForm").modal("show")
  }
}
