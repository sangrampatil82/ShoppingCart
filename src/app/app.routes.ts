import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { authGuard } from './guards/auth.guard';
import { ProductComponent } from './components/product/product.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AdminComponent } from './components/admin/admin.component';
import { PaymentComponent } from './components/payment/payment.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent,canActivate: [authGuard]},
    { path: 'product', component: ProductComponent,canActivate: [authGuard] },
    { path: 'cart', component: CartComponent,canActivate: [authGuard] },
    { path: 'checkout', component: CheckoutComponent,canActivate: [authGuard] },
    { path: 'admin', component: AdminComponent,canActivate: [authGuard] },
    { path: 'payment', component: PaymentComponent,canActivate: [authGuard] },
    { path: '', redirectTo: 'login', pathMatch: 'full'},    
];
