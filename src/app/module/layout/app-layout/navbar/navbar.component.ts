import { Component, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { RouteInfo } from '../_model/route-info';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { CategoryService } from '../../../product/_service/category.service';
import { Category } from '../../../product/_model/category';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

    // Iconos
    loggedIn = false;
    userIcon = faUser;

    // Flags
    mostrarSidebar: boolean = false;

    // Datos
    categories: Category[] = [];


    constructor(
      private categoryService: CategoryService,
      private router: Router,
    ){}

    ngOnInit(){
      if(localStorage.getItem("token")){
        this.loggedIn = true;
      }
      this.getCategories();
    }

    getCategories(){
      this.categoryService.getActiveCategories().subscribe({
        next: (v) => {
          this.categories = v.body!;
          console.log(this.categories);
        },
        error: (e) => {
          console.log(e.error!.message);
        }
      });
    }

    showProductsCategory(category_id: number){
      this.mostrarSidebar = !this.mostrarSidebar;
      this.router.navigate(['producto/' + category_id]);
    }

    showSidebar(){
      this.mostrarSidebar = !this.mostrarSidebar;
    }
    
    click(){
      console.log('click')
    }
}
