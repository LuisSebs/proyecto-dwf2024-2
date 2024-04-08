import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecuredComponent } from './secured/secured.component';

import { AppRoutingModule } from '../../app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    SecuredComponent,
    LoginComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ]
})
export class AuthenticationModule { }
