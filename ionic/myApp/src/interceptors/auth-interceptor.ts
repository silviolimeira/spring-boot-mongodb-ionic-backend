import { Injectable } from '@angular/core';

import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { StorageService } from 'src/services/storage.service';

export class AuthInterceptor implements HttpInterceptor {

    constructor(public storage: StorageService) {

    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let localUser = this.storage.getLocalUser();

        if (localUser) {
           const authReq = request.clone({headers: request.headers.set('Authorization', 'Bearer ' + localUser.token)});
           return next.handle(authReq);
        } else {
            return next.handle(request);
        }

    }
}

export const AuthInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
};