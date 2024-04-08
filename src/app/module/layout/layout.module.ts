import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppLayoutComponent } from './app-layout/app-layout.component';
import { FooterComponent } from './app-layout/footer/footer.component';
import { NavbarComponent } from './app-layout/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { AppLayoutRoutes } from './app-layout/app-layout.routing';



@NgModule({
  declarations: [
    AppLayoutComponent,
    FooterComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(AppLayoutRoutes)
  ]
})
export class LayoutModule { }
