import { Routes } from '@angular/router';
import { currentUser } from '@core/utils/getCurrentUser';

export const homeRoutes: Routes = [
  {
    path: 'tracks',
    resolve: {
      currentUser
    },
    loadChildren: () => import('@modules/tracks/tracks.routes').then(m => m.tracksRoutes)
  },
  {
    path: 'history',
    loadChildren: () => import('@modules/history/history.routes').then(m => m.historyRoutes)
  },
  {
    path: 'favorites',
    loadChildren: () => import('@modules/favorites/favorites.routes').then(m => m.favoritesRoutes)
  },
  {
    path: '**',
    redirectTo: '/tracks'
  }
];
