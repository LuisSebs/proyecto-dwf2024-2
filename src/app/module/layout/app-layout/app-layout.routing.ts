import { Routes } from '@angular/router';
import { SecuredComponent } from '../../authentication/secured/secured.component';
import { authenticationGuard } from '../../authentication/_guard/authentication.guard';
import { CategoryComponent } from '../../product/component/category/category.component';


export const AppLayoutRoutes: Routes = [
    //{path: '', component: LoginComponent},
    //{path: 'register', component: RegisterComponent},
    {path: 'categoria', component: CategoryComponent},
    {path: 'secured', component: SecuredComponent, canActivate : [authenticationGuard]}
];
