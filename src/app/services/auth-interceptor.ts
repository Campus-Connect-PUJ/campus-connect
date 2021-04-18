import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

export class AuthInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    const idToken = sessionStorage.getItem("token");

    if (idToken) {
      // console.log("enviando con token: " + idToken);
      const cloned = req.clone({
        headers: req.headers.set(
          "Authorization",
          idToken
        )
      });

      console.log("interceptado");
      return next.handle(cloned);
    }
    else {
      // console.log(req);
      return next.handle(req);
    }
  }
}
