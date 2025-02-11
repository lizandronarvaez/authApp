import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { delay, tap } from 'rxjs';

@Component({
    selector: 'app-login-page',
    standalone: false,
    templateUrl: './login-page.component.html',
})
export class LoginPageComponent {
    public form: FormGroup = inject(FormBuilder).group({
        email: ['', [Validators.email, Validators.required]],
        password: ['', [Validators.required, Validators.minLength(3)]]
    })
    private authService = inject(AuthService);
    private router = inject(Router);

    login(): void {
        if (this.form.invalid) return;

        this.authService.loginUser(this.form.value.email, this.form.value.password)
            .pipe(
                tap((data) => {
                    Swal.fire({
                        title: "Sesión iniciada",
                        text: data?.message,
                        icon: "success",
                        timer: 2000
                    });
                })
            )
            .subscribe({
                next: () => setTimeout(() => this.router.navigateByUrl('/dashboard'), 2000),
                error: (message) => {
                    Swal.fire({
                        title: "Hubo un error",
                        text: message,
                        icon: "error"
                    });
                }
            });
    }
}
