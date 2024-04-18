import { Routes } from '@angular/router';
import { SecuredComponent } from '../../authentication/secured/secured.component';
import { authenticationGuard } from '../../authentication/_guard/authentication.guard';
import { ProductComponent } from '../../product/component/product/product/product.component';
import { CategoryComponent } from '../../product/component/category/category.component';
import { LoginComponent } from '../../authentication/login/login.component';
import { RegisterComponent } from '../../authentication/register/register.component';


export const AppLayoutRoutes: Routes = [
    {path: '', component: LoginComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'categoria', component: CategoryComponent},
    {path: 'producto', component: ProductComponent},
    {path: 'secured', component: SecuredComponent, canActivate : [authenticationGuard]}
];
