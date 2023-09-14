import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from '../service/auth.service';
import { private_route } from 'src/shared/constants/routes';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (this.authenticationService.isLoggedIn()) {
      console.log('Usuário autenticado.');
      return true;
    } else {
      console.log('Usuário não autenticado. Redirecionando para login.');
      this.router.navigate(['/auth/login']);
      return false;
    }
  }
}
