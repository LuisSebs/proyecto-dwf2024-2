import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppLayoutComponent } from './app-layout/app-layout.component';
import { FooterComponent } from './app-layout/footer/footer.component';
import { NavbarComponent } from './app-layout/navbar/navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { AppLayoutRoutes } from './app-layout/app-layout.routing';
import { HomeComponent } from './app-layout/home/home.component';
import { ExperienceComponent } from './react/experience/experience.component';
import { ThreejsComponent } from './react/threejs/threejs.component';



@NgModule({
  declarations: [
    AppLayoutComponent,
    FooterComponent,
    NavbarComponent,
    HomeComponent,
    ExperienceComponent,
    ThreejsComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule.forChild(AppLayoutRoutes)
  ]
})
export class LayoutModule { }
