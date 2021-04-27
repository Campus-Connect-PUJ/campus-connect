import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { NetService } from '../utils/net.service';
import { UsuarioGeneral } from '../Model/UsuarioGeneral/usuario-general';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  USER = "user";
  TOKEN = "token"

  constructor(
    private net: NetService,
    private http: HttpClient
  ) { }

  loginPost(url: string, msg: unknown): Observable<HttpResponse<UsuarioGeneral>> {
    const respuesta = this.http
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
    const url = `${environment.baseUrl}/usuario/login`;
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
    const url = `${environment.baseUrl}/user/current`;
    return this.net.get<UsuarioGeneral>(url);
  }

  getUser(): UsuarioGeneral {
    const usuario: UsuarioGeneral = JSON.parse(sessionStorage.getItem('user'));
    return usuario;
  }

  getToken(): string {
    return sessionStorage.getItem(this.TOKEN);
  }

  storeUser(u: UsuarioGeneral, token: string) {
    sessionStorage.setItem('user', JSON.stringify(u));
    sessionStorage.setItem('token', token);
  }

  logout() {
    try {
      sessionStorage.removeItem("perso"+this.getUser().email);
    } catch (error) {
      console.log("No se le borra el perfil de personalización")
    }
    sessionStorage.removeItem(this.USER);
    sessionStorage.removeItem(this.TOKEN);
    return this.http.post(`${environment.baseUrl}/logout`, '', {
      withCredentials: true
    });
  }

  

  isAuthorized(allowedRoles: string[]): boolean {
    // check if the list of allowed roles is empty, if empty,
    // authorize the user to access the page
    if (allowedRoles == null || allowedRoles.length === 0) {
      return true;
    }

    const user: UsuarioGeneral = this.getUser();

    if (!user) {
      return false;
    }

    // console.log('object', allowedRoles);
    // console.log('usuario', user.roles);

    let valido = false;

    user.roles.forEach(
      (rol: string) => {
        if (allowedRoles.includes(rol)) {
          valido = true;
        }
      }
    )

    return valido;
  }


  guardarElemento(nombre: string, objeto){
    sessionStorage.setItem(nombre, JSON.stringify(objeto))
  }

  obtenerElemento(nombre: string){ 
    let elemento = JSON.parse(sessionStorage.getItem(nombre));
    return elemento;
  }

}
