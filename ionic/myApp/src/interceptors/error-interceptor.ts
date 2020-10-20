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
import { FieldMessage } from "src/models/fieldmessage";

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
        let errorObj = {};
        if (error.error instanceof ErrorEvent) {
          console.log("this is client side error");
          errorMsg = `Error: ${error.error.message}`;
        } else {
          console.log("this is server side error");
          errorObj = error.error;
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
          case 422:
            this.handle422(errorObj);
            break;
          default:
            this.handleDefaultError(errorMsg);
        }

        return throwError(errorObj);
      })
    );
  }

  private listErrors(messages: FieldMessage[]): string {
    let s: string = "";

    for (var i = 0; i < messages.length; i++) {
      s =
        s +
        "<p><strong>" +
        messages[i].fieldName +
        "</strong>" +
        messages[i].message +
        "</p>";
    }

    return s;
  }

  async handle422(errorObj) {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header: "Erro 422: Validação",
      message: this.listErrors(errorObj.errors),
      backdropDismiss: false,
      buttons: [
        {
          text: "OK",
          handler: () => {
            console.log("handle 422 ok");
          },
        },
      ],
    });
    await alert.present();
  }

  async handleDefaultError(error) {
    //public alertController: AlertController
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
