import { Component, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { RouteInfo } from '../_model/route-info';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { CategoryService } from '../../../product/_service/category.service';
import { Category } from '../../../product/_model/category';
import { CartService } from '../../../invoice/_service/cart.service';
import { SwalMessages } from '../../../commons/_dto/swal-messages';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

    // Imports
    swal: SwalMessages = new SwalMessages();

    // Iconos
    userIcon = faUser;

    // Flags
    mostrarSidebar: boolean = false;
    loggedIn = false;
    isUser = false;

    // Datos
    categories: Category[] = [];
    cartItemCount: number = 0;

    // Inputs
    searchQuery: string = "";

    constructor(
      private categoryService: CategoryService,
      private cartService: CartService,
      private router: Router,
    ){}

    ngOnInit(){
      if(localStorage.getItem("token")){
        this.loggedIn = true;
        let user = JSON.parse(localStorage.getItem('user')!);
        if (user.rol == 'USER'){
          this.isUser = true;    
          this.getCartCount();      
        }
      }
      this.getCategories();
    }

    getCategories(){
      this.categoryService.getActiveCategories().subscribe({
        next: (v) => {
          this.categories = v.body!;
        },
        error: (e) => {
          console.log(e.error!.message);
        }
      });
    }

    getCartCount(){
      this.cartService.getCart().subscribe({
        next: (v) => {
          let count: number = 0;
          v.body!.map( _ => {
            count++;
          });
          this.cartItemCount = count;
        },
        error: (e) => {
          this.swal.errorMessage(e.error!.message);
        }
      });
    }

    showProductsCategory(category_id: number){
      this.mostrarSidebar = !this.mostrarSidebar;
      this.router.navigate(['producto/categoria/' + category_id]);
    }

    showSidebar(){
      this.mostrarSidebar = !this.mostrarSidebar;
    }

    clearSearch(){
      this.searchQuery = '';
    }
    
    search(){
      if (this.searchQuery.trim() !== ''){
        this.router.navigate(['producto/busqueda/' + this.searchQuery]);
      }
      
    }
}
