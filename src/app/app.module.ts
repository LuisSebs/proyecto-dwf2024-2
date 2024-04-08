import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductModule } from './module/product/product.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { jwtInterceptorInterceptor } from './core/interceptor/jwt-interceptor.interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ProductModule
  ],
  providers: [
    provideHttpClient(withInterceptors([jwtInterceptorInterceptor]))
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
