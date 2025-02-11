import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { privateGuard } from './auth/guards/privateGuard.guard';
import { publicGuard } from './auth/guards/publicGuard.guard';

const routes: Routes = [
    {
        path: 'auth',
        canActivate: [publicGuard],
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
    },
    {
        path: 'dashboard',
        canActivate: [privateGuard],
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
    },
    {
        path: '**',
        redirectTo: 'auth'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
