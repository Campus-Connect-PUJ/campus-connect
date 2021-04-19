import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { NetService } from '../utils/net.service';
import { UsuarioGeneral } from '../Model/UsuarioGeneral/usuario-general';
import { Observable } from 'rxjs';
import { Carrera } from '../Model/Carrera/carrera';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  constructor(
    private net: NetService,
    private http: HttpClient
  ) { }

  loginPost(url: string, msg): Observable<HttpResponse<UsuarioGeneral>> {
    let respuesta = this.http
      .post(
        url,
        msg,
        {
          withCredentials: true,
          observe: 'response'
        }
      );

    return respuesta as Observable<HttpResponse<UsuarioGeneral>> ;
  }

  login(username: string, password: string): Observable<HttpResponse<UsuarioGeneral>> {
    let url = `${environment.baseUrl}/usuario/login`;
    return this.loginPost(url,
      {
        "username": username,
        "password": password
      }
    );
  }

  register(
    nombre: string,
    apellido: string,
    email: string,
    password: string,
    semestre: number
  ): Observable<HttpResponse<UsuarioGeneral>> {
    const url = `${environment.baseUrl}/usuario/login/registro`;
    return this.loginPost(url,
      {
        nombre: nombre,
        apellido: apellido,
        email: email,
        password: password,
        semestre: semestre
      }
    );
  }

  // TODO: update

  findUser() {
    let url = `${environment.baseUrl}/user/current`;
    return this.net.get<UsuarioGeneral>(url);
  }

  getUser(): UsuarioGeneral {
    let usuario: UsuarioGeneral = JSON.parse(sessionStorage.getItem('user'));
    return usuario;
  }

  getToken(): string {
    return sessionStorage.getItem("token");
  }

  storeUser(u: UsuarioGeneral, token: string) {
    sessionStorage.setItem('user', JSON.stringify(u));
    sessionStorage.setItem('token', token);
  }

  logout() {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
    return this.http.post(`${environment.baseUrl}/logout`, '', {
      withCredentials: true
    });
  }

  isAuthorized(allowedRoles: string[]): boolean {
    // // check if the list of allowed roles is empty, if empty, authorize the user to access the page
    if (allowedRoles == null || allowedRoles.length === 0) {
      return true;
    }

    let user: UsuarioGeneral = this.getUser();

    if (!user) {
      return false;
    }

    console.log('object', allowedRoles);
    console.log('usuario', user.rol);

    let valido = false;
    if (allowedRoles.includes(user.rol)) {
      valido = true;
    }

    return valido;
  }
}
