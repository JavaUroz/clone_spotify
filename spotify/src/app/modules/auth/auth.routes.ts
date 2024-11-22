import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';

export const authRoutes: Routes = [
  {
    path:'login', //http://localhost:4200/auth/login
    component: LoginPageComponent
  },
  {
    path:'**', //http://localhost:4200/auth/
    redirectTo: '/auth/login'
  }
];