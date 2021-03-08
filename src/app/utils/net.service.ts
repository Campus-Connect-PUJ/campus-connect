import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NetService {

  constructor(private http: HttpClient) { }

  public get<T>(url): Observable<T> {
    // http.get(url, { responseType: 'text' })
    console.log('get:', url);
    return this.http
      .get<T>(
        url,
        {
          responseType: 'json',
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            Accept: 'application/json'
          }),
          withCredentials: true
        })
      .pipe(
        // retry(5),
        catchError(this.handleError)
      );
  }

  public post<T>(url, data: T): Observable<T> {
    console.log('post:', url);
    return this.http
      .post<T>(url, data, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        }),
        withCredentials: true
      })
      .pipe(
        // retry(5),
        catchError(this.handleError)
      );
  }

  public put<T>(url, data: T): Observable<T> {
    console.log('put:', url);
    return this.http.put<T>(
      url,
      data,
      {
        withCredentials: true
      }
    ).pipe(
      // retry(5),
      catchError(this.handleError)
    );
  }

  public delete<T>(url, data: T): Observable<T> {
    console.log('delete:', url);
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: data,
      withCredentials: true
    };

    return this.http.delete<T>(url, options)
      .pipe(
        // retry(5),
        catchError(this.handleError)
      )
    ;
  }

  public handleError(error: HttpErrorResponse): Observable<any> {
    console.log(error);
    return throwError('An error has occurred');
  }
}
