import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Obtener el token JWT de localStorage (o sessionStorage si prefieres)
    const token = localStorage.getItem('token');

    // Clonar la solicitud y agregar el token en el encabezado Authorization si está disponible
    if (token) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });
      return next.handle(cloned);
    } else {
      // Si no hay token, enviar la solicitud original sin modificar
      return next.handle(req);
    }
  }
}