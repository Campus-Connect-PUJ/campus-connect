import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export class AuthInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    const idToken = sessionStorage.getItem("token");
    // console.log(req.url + " includes? " + `${environment.baseUrl}`);

    if (idToken && req.url.includes(`${environment.baseUrl}`)) {
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
