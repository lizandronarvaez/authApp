import { Component, computed, inject } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
    standalone: false,
    templateUrl: './dashboard-layout.component.html',
})
export class DashboardLayoutComponent {

    private _authService = inject(AuthService);
    public currentUser = computed(() => this._authService.currentUser());
    private router= inject(Router);

    logout():void{
        this._authService.logoutUser();
        this.router.navigateByUrl('/auth/login');
    }
}
