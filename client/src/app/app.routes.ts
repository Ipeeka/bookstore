import { Routes } from '@angular/router';
import { authGuard } from './shared/guard/auth.guard';


export const routes: Routes = [


    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
    },
    {
        path: '',
        loadChildren: () => import('./components/partials/partials.module').then(m => m.PartialsModule),
        canActivate: [authGuard],
    },
    // {
    //     path: 'error',
    //     component: ErrorPageComponent
    // },
    {
        path: '**',
        redirectTo: 'auth'
    },
  
     
];
