import { Routes } from '@angular/router';
import { Payments } from './pages/payments/payments';
import { Supply } from './pages/supply/supply';
import { Customers } from './pages/customers/customers';
import { Dashboard } from './pages/dashboard/dashboard';
import { Login } from './features/login/login';
import { authGuard } from './core/guards/auth-guard';
import { Stock } from './pages/stock/stock';

export const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', canActivate: [authGuard], component: Dashboard },
    { path: 'customers', canActivate: [authGuard], component: Customers },
    { path: 'supply', canActivate: [authGuard], component: Supply },
    { path: 'payments', canActivate: [authGuard], component: Payments },
    { path: 'stock', canActivate: [authGuard], component: Stock },
    { path: 'login', component: Login }
];
