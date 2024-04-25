import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { authGuard } from './guards/auth.guard';
import { ProductComponent } from './components/product/product.component';
import { CartComponent } from './components/cart/cart.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent},
    { path: 'dashboard', component: DashboardComponent,canActivate: [authGuard],},
    { path: 'product', component: ProductComponent},
    { path: 'cart', component: CartComponent},
    { path: '', redirectTo: 'login', pathMatch: 'full' },    
];
