import { HomePageComponent } from '@modules/home/pages/home-page/home-page.component';
import { Routes } from '@angular/router';
import { SessionGuardFunctional } from '@core/guards/sessionv2.guard';

export const appRoutes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import(`./modules/auth/auth.routes`).then(m => m.authRoutes)
  },
  {
    path: '',
    component: HomePageComponent,
    loadChildren: () => import(`./modules/home/home.routes`).then(m => m.homeRoutes),
    canActivate: [SessionGuardFunctional]
  }
];