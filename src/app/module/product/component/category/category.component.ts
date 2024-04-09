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
    this.categoryToUpdate = 0; // reset categoryToUpdate
  }

  hideModalForm(){
    $("#modalForm").modal("hide");
  }

  onSubmit(): void {
    // Validamos el form
    this.submitted = true;
    if (this.checkoutForm.invalid) {
      this.swal.errorMessage('Input invalido');
      return;
    }
    this.submitted = false;

    // validate categoryToUpdate
    if (this.categoryToUpdate == 0){
      this.onSubmitCreate();
    }else{
      this.onSubmitUpdate();
    }
  }

  onSubmitCreate(){
    console.log(this.checkoutForm.value)

    // Agregamos la categoria en la lista de categorias
    this.categoryService.createCategory(this.checkoutForm.value).subscribe({
      next: (v) => {
        // Mostramos el mensaje de exito
        this.swal.successMessage(v.body!.message);
        // Recargamos las categorias
        this.getCategories();
        // Escondemos el form
        this.hideModalForm();
        this.checkoutForm.reset();
      },
      error: (e) => {
        console.log(e);
        this.swal.errorMessage(e.error!.message);
      }
    });
  }

  onSubmitUpdate(){
    // add category to category list
    this.categoryService.updateCategory(this.checkoutForm.value, this.categoryToUpdate).subscribe({
      next: (v) => {
        this.swal.successMessage(v.body!.message);
        this.getCategories(); // reload categories
        this.hideModalForm(); // close modal
        this.categoryToUpdate = 0; // reset categoryToUpdate
      },
      error: (e) => {
        console.log(e);
        this.swal.errorMessage(e.body!.message); // show message
      }
    });
  }

  updateCategory(category: Category){
    this.categoryToUpdate = category.category_id;
    this.checkoutForm.reset();
    this.checkoutForm.controls['category'].setValue(category.category);
    this.checkoutForm.controls['acronym'].setValue(category.acronym);
    this.submitted = false;
    $("#modalForm").modal("show");
  }

  deleteCategory(id: number){
    this.swal.confirmMessage.fire({
      title: 'Favor de confirmar la activación de la región',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Confirmar',
    }).then((result: any) => {
      if (result.isConfirmed){
        this.categoryService.deleteCategory(id).subscribe({
          next: (v) => {
            this.swal.successMessage(v.body!.message); // show message
            this.getCategories(); // reload categories
          },
          error: (e) => {
            console.log(e);
            this.swal.errorMessage(e.error!.message); // show message
          }
        });
      }
    });
  }

  activateCategory(id: number){
    this.swal.confirmMessage.fire({
      title: 'Favor de confirmar la activacion de la region',
      icon: 'warning',
      showCancelBUtton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Confirmar',
    }).then((result: any) => {
      if (result.isConfirmed){
        this.categoryService.activateCategory(id).subscribe({
          next: (v) => {
            this.swal.successMessage(v.body!.message); // show message
            this.getCategories(); // reload categories
          },
          error: (e) => {
            console.log(e);
            this.swal.errorMessage(e.error!.message); // show message
          }
        });
      }
    });
  }

  onClose() {
    this.hideModalForm();
  }
}
