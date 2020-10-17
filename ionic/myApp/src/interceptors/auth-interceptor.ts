import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS} from '@angular/common/http';
import {Observable} from "rxjs";
import { StorageService } from 'src/services/storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(public storage: StorageService){

  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let localUser = this.storage.getLocalUser();

    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${localUser.token}`
      }
    });

    return next.handle(req);
  }
}

export const AuthInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
};