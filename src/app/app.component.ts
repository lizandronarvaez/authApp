import { Component, inject, computed, effect } from '@angular/core';
import { tap } from 'rxjs';
import { AuthService } from './auth/services/auth.service';
import { Router } from '@angular/router';
import { AuthStatus } from './auth/enum/auth-status.enum';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    standalone: false,
})
export class AppComponent {

}
