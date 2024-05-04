import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppLayoutComponent } from './app-layout/app-layout.component';
import { FooterComponent } from './app-layout/footer/footer.component';
import { NavbarComponent } from './app-layout/navbar/navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { AppLayoutRoutes } from './app-layout/app-layout.routing';
import { HomeComponent } from './app-layout/home/home.component';



@NgModule({
  declarations: [
    AppLayoutComponent,
    FooterComponent,
    NavbarComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule.forChild(AppLayoutRoutes)
  ]
})
export class LayoutModule { }
