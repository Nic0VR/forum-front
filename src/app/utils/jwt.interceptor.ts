import { environment } from './../../environments/environment';

import { Observable, catchError, throwError } from 'rxjs';
import {
  HttpResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../service/login.service';

/**
 * Gestion du token d'accès à l'API
 */
@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  /**
   * Constructeur de la classe injectant le service d'authentification
   * @param authService
   */
  constructor(private loginService: LoginService, private router: Router) {}

  /**
   * Interception des requêtes pour ajouter le token dans le header
   * @param req
   * @param next
   * @returns
   */
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const currentUser = this.loginService.currentUserValue;
    if (
      currentUser &&
      currentUser.token &&
      req.url.startsWith(environment.api_back)
    ) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      });
    }

    return next.handle(req).pipe(
      catchError((err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.loginService.logout();

            this.router.navigateByUrl('/login');
          }
        }

        throw err.error;
      }) as any
    );
  }
}
