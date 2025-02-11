import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { catchError, map, of } from 'rxjs';

export const publicGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    return authService.checkAuthentication().pipe(
        map((isAuthenticated) => {
            if (isAuthenticated) {
                router.navigateByUrl('/dashboard');
                return false;
            }
            return true;
        }),
        catchError((error) => {
            console.log('error', error);
            return of(true);
        })
    );
};
