import { Component } from '@angular/core';
import { Category } from '../../_model/category';
import { CategoryService } from '../../_service/category.service';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { SwalMessages } from '../../../commons/_dto/swal-messages';

declare var $: any;

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})

export class CategoryComponent {

  categories: Category[] = [];

  categoryToUpdate: number = 0;

  // Category form
  checkoutForm = this.formBuilder.group({
    category: ["", [Validators.required]],
    acronym: ["", [Validators.required]], 
  });

  submitted = false;

  swal: SwalMessages = new SwalMessages(); // swal messages

  constructor(
    private categoryService: CategoryService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.categoryService.getCategories().subscribe({
      next: (v) => {
        this.categories = v.body!;
      },
      error: (e) => {
        console.log(e);
        this.swal.errorMessage(e.error!.message); // show message
      }
    });
  }

  showModalForm(){
    $("#modalForm").modal("show");
    this.submitted = false;
    this.checkoutForm.reset();
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
	showConfirmButton: false,
	timer: 3000
      });
      return;
    }
    this.submitted = false;
    // Agregamos la categoria en la lista de categorias
    let id = this.categories.length;
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
      showConfirmButton: false,
      timer: 3000
    });
  }

  onClose() {
    this.hideModalForm();
  }
}
