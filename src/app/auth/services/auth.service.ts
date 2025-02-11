import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, pipe, tap, throwError } from 'rxjs';

import { enviroment } from '../../../environments/environments';
import { LoginResponse, User } from '../interfaces';
import { AuthStatus } from '../enum/auth-status.enum';


@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private httpClient = inject(HttpClient);
    private readonly baseUrl: string = enviroment.baseUrl;
    private _currentUser = signal<User | null>(null);
    private _authStatus = signal<AuthStatus>(AuthStatus.checking);

    // Metodo de solo lectura que se expone a los componentes
    public currentUser = computed(() => this._currentUser());
    public authStatus = computed(() => this._authStatus());

    private setAuthentication(user: User, token: string): boolean {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        this._currentUser.set(user);
        this._authStatus.set(AuthStatus.authenticated);
        return true;
    }


    loginUser(email: string, password: string): Observable<LoginResponse> {
        return this.httpClient.post<LoginResponse>(`${this.baseUrl}/auth/login`, { email, password }).pipe(
            tap((response) => this.setAuthentication(response.user, response.token)),
            // map(({ user, token }) => this.setAuthentication(user, token)),
            catchError((error) => {
                this._authStatus.set(AuthStatus.notAuthenticated)
                return throwError(() => error.error.message);
            })
        );
    }

    // TODO: REALIZAR LOGOUT USUARIO
    logoutUser(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        this._currentUser.set(null);
        this._authStatus.set(AuthStatus.notAuthenticated);
    }

    checkAuthentication(): Observable<boolean> {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');

        if (!token || !user) {
            this._authStatus.set(AuthStatus.notAuthenticated);
            return of(false);
        }

        this._currentUser.set(JSON.parse(user));
        this._authStatus.set(AuthStatus.authenticated);
        return of(true);
    }

}
