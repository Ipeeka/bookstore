import { Routes } from '@angular/router';
import { authGuard } from './shared/guard/auth.guard';
import { CartComponent } from './components/cart/cart.component';


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
    {
        path: 'component',  
        loadChildren: () => import('./components//components.module').then(m => m.ComponentsModule),
      
    },
      
     
];
