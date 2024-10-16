import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    // Verificar si el usuario está autenticado (si el token JWT existe)
    const token = localStorage.getItem('token');

    if (token) {
      // Si el token existe, permitir el acceso a la ruta
      return true;
    } else {
      // Si no hay token, redirigir a la página de login
      this.router.navigate(['/login']);
      return false;
    }
  }


}
