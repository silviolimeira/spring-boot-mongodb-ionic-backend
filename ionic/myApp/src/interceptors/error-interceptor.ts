import { Injectable } from "@angular/core";

import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HTTP_INTERCEPTORS,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { StorageService } from "src/services/storage.service";
import { AlertController } from "@ionic/angular";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    public storage: StorageService,
    public alertController: AlertController
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMsg = "";
        if (error.error instanceof ErrorEvent) {
          console.log("this is client side error");
          errorMsg = `Error: ${error.error.message}`;
        } else {
          console.log("this is server side error");
          errorMsg = error.error;
          console.log("error: " + JSON.stringify(errorMsg));
          console.log(JSON.stringify(errorMsg));
        }

        switch (error.status) {
          case 401:
            this.handle401();
            break;
          case 403:
            this.handle403();
            break;
          default:
            this.handleDefaultError(errorMsg);
        }

        return throwError(errorMsg);
      })
    );
  }

  async handleDefaultError(error) {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header: "Erro " + error.status + ": " + error.error,
      message: error.message,
      backdropDismiss: false,
      buttons: [
        // {
        //   text: "Cancelar",
        //   role: "cancel",
        //   cssClass: "secondary",
        //   handler: (blah) => {
        //     console.log("Confirm Cancel: blah");
        //   },
        // },
        {
          text: "OK",
          handler: () => {
            console.log("Confirm Okay");
          },
        },
      ],
    });
    await alert.present();
  }

  async handle401() {
    console.log("handle 401");
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header: "Erro 401: Falha na autenticação",
      message: "<strong>Email</strong> ou <strong>senha</strong> incorretos!!!",
      backdropDismiss: false,
      buttons: [
        // {
        //   text: "Cancelar",
        //   role: "cancel",
        //   cssClass: "secondary",
        //   handler: (blah) => {
        //     console.log("Confirm Cancel: blah");
        //   },
        // },
        {
          text: "OK",
          handler: () => {
            console.log("Confirm Okay");
          },
        },
      ],
    });
    await alert.present();
  }

  handle403() {
    console.log("handle 403");
    this.storage.setLocalUser(null);
  }
}

export const ErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true,
};
