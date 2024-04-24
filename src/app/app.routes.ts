import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { authGuard } from './guards/auth.guard';
import { ProductComponent } from './components/product/product.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent},
    { path: 'dashboard', component: DashboardComponent,canActivate: [authGuard],},
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'product', component: ProductComponent},
];
