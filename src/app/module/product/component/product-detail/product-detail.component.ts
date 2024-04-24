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

declare var $: any; // JQuery

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {
  product: Product = new Product();
  categories: Category[] = [];

    // Product form
  form = this.formBuilder.group({
    product: ["", [Validators.required]],
    // gtin: ["", [Validators.required, Validators.pattern('^[0-9]{13}$')]],
    description: ["", [Validators.required]],
    price: [0, [Validators.required, Validators.pattern('^[0-9]*$')]],
    stock: [0, [Validators.required, Validators.pattern('^[0-9]*$')]],
    category_id: [0, [Validators.required]],
    status: [0, [Validators.required, Validators.pattern('^[0-1]*$')]],
  });

  submitted = false; // Variable para saber si el formulario ha sido enviado

  redirect(url: string[]){
    this.router.navigate(url);
  }

  constructor(
    private productService: ProductService,
    public ProductImageService: ProductImageService,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    // private route: ActivatedRoute,
    private router: Router, // router por si queremos redirigir a otro componente

    private service: NgxPhotoEditorService
  ){}

}
