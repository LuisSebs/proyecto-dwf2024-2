import { Routes } from '@angular/router';
import { SecuredComponent } from '../../authentication/secured/secured.component';
import { authenticationGuard } from '../../authentication/_guard/authentication.guard';
import { ProductComponent } from '../../product/component/product/product/product.component';
import { CategoryComponent } from '../../product/component/category/category.component';
import { LoginComponent } from '../../authentication/login/login.component';
import { RegisterComponent } from '../../authentication/register/register.component';
import { ProductDetailComponent } from '../../product/component/product-detail/product-detail.component';
import { HomeComponent } from './home/home.component';
import { ProductClientComponent } from '../../product/component/product-client/product-client.component';
import { adminGuard } from '../../authentication/_guard/admin.guard';
import { ProductDetailClientComponent } from '../../product/component/product-detail-client/product-detail-client.component';

export const AppLayoutRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'categoria', component: CategoryComponent, canActivate : [authenticationGuard, adminGuard]},
    {path: 'producto-admin', component: ProductComponent, canActivate : [authenticationGuard, adminGuard]},
    {path: 'producto', component: ProductClientComponent},
    {path: 'secured', component: SecuredComponent, canActivate : [authenticationGuard]},
    {path: 'producto/:gtin', component: ProductDetailComponent, canActivate: [authenticationGuard, adminGuard]},
    {path: 'producto-detail/:gtin', component: ProductDetailClientComponent}
];
