import { Injectable } from '@angular/core';
import { Category } from '../_model/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categories: Category[] = []

  constructor() { }

  getCategories(){
    this.categories.push(new Category(0, "juego de rol", "RPG", 1));
    this.categories.push(new Category(1, "battle royale", "BR", 0));
    this.categories.push(new Category(2, "shooter", "TPS", 1));

    return this.categories;
  }

}
