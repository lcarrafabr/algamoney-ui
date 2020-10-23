import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

export class NotAuthenticatedError {
    
}

/* @Injectable()
export class MoneyHttpInterceptor implements HttpInterceptor {

    constructor(private auth: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {

        if (!req.url.includes('/oauth/token') && this.auth.isAccessTokenInvalido()) {

        return from(this.auth.obterNovoAccessToken())
            .pipe(
                mergeMap(() => {
                    if (this.auth.isAccessTokenInvalido()) {
                        throw new NotAuthenticatedError();
                    }
                    req = req.clone({
                        setHeaders: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    });
                    return next.handle(req);
                })
            );
        }

        return next.handle(req);
    }
} */

@Injectable()
export class JwtHttpInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
      
      if (token && request.url.indexOf('/oauth/token') === -1) {
        request = request.clone({
          setHeaders: {
            Accept: `application/json`,
            'Content-Type': `application/json`,
            Authorization: `Bearer ${token}`
          }
        });

      } 
      return next.handle(request);
  }
}
