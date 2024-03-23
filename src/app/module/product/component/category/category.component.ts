import { Component } from '@angular/core';
import { Category } from '../../_model/category';
import { CategoryService } from '../../_service/category.service';
import { FormBuilder, Validators } from '@angular/forms'
import Swal from 'sweetalert2';

declare var $: any;

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})

export class CategoryComponent {

  categories: Category[] = [];

  // Category form
  checkoutForm = this.formBuilder.group({
    category: ["", [Validators.required]],
    acronym: ["", [Validators.required]], 
  });

  submitted = false;

  constructor(
    private categoryService: CategoryService,
    private formBuilder: FormBuilder,
  ) { }

  getCategories() {
    this.categories = this.categoryService.getCategories();
  }

  ngOnInit() {
    this.getCategories();
  }

  showModalForm(){
    $("#modalForm").modal("show");
  }

  hideModalForm(){
    $("#modalForm").modal("hide");
  }

  onSubmit(): void {
    // Validamos el form
    this.submitted = true;
    if (this.checkoutForm.invalid) {
      Swal.fire({
        position: 'top-end',
	icon: 'error',
	toast: true,
	text: 'Input invalido',
	background: '#E8F8F8',
	showConfirmationButton: false,
	timer: 3000
      });
      return;
    }
    this.submitted = false;
    // Agregamos la categoria en la lista de categorias
    let id = this.categories.length + 1;
    let categoria = new Category(id, this.checkoutForm.controls['category'].value!,
				 this.checkoutForm.controls['acronym'].value!, 1);
    this.categories.push(categoria);

    // Escondemos el form
    this.hideModalForm();
    this.checkoutForm.reset();

    // Mostramos el mensaje de exito
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      toast: true,
      text: 'La nueva categoria ha sido agregada',
      background: '#E8F8F8',
      showConfirmationButton: false,
      timer: 3000
    });
  }

  onClose() { 
    this.hideModalForm();
    this.checkoutForm.reset();
  }
}
