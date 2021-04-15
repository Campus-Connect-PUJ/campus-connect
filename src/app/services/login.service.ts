import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { NetService } from '../utils/net.service';
import { UsuarioGeneral } from '../Model/UsuarioGeneral/usuario-general';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  constructor(
    private net: NetService,
    private http: HttpClient
  ) { }

  login(username: string, password: string) {
    const formHeaders = new HttpHeaders();
    formHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

    const formParams = new HttpParams()
      .set('username', username)
      .set('password', password);

    let url = `${environment.baseUrl}/login`;

    let respuesta = this.http
      .post(
        url, null,
        {
          headers: formHeaders,
          params: formParams,
          withCredentials: true
        }
      )
      ;
    return respuesta;
  }

  // TODO: register(
  //     email: string,
  //     password: string,
  //     nombre: string,
  //     apellido: string
  //   )

  // TODO: update

  findUser() {
    let url = `${environment.baseUrl}/user/current`;
    return this.net.get<UsuarioGeneral>(url);
  }

  getUser(): UsuarioGeneral {
    let usuario: UsuarioGeneral = JSON.parse(sessionStorage.getItem('user'));
    return usuario;
  }

  storeUser(u: UsuarioGeneral) {
    sessionStorage.setItem('user', JSON.stringify(u));
  }

  logout() {
    sessionStorage.removeItem("user");
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
    if (allowedRoles.includes(user.rol.authority)) {
      valido = true;
    }

    return valido;
  }
}
