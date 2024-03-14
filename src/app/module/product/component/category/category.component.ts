import { Component } from '@angular/core';
import { CategoryService } from '../../_service/category.service';
import { Category } from '../../_model/category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {

  categories: Category[] = [];

  constructor(
    private categoryService: CategoryService
    ) { }

  getCategories() {
    this.categories = this.categoryService.getCategories();
  }

  ngOnInit() {
    this.getCategories();
  }
}
