import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { Location } from '@angular/common';
import { LoginService } from 'src/app/services/login.service';
import { UsuarioGeneral } from 'src/app/Model/UsuarioGeneral/usuario-general';

@Component({
  selector: "app-perfil",
  templateUrl: "./perfil.page.html",
  styleUrls: ["./perfil.page.scss"],
})
export class PerfilPage implements OnInit {
  private url = "http://localhost:8080/usuario/email/";
  public email = " ";
  public semestre = " ";
  public Nombre = " ";
  public carreras = [];
  constructor(
    private http: HttpClient,

    private aus: LoginService,
    private _location: Location
  ) {}

  ngOnInit() {
    let emai_storage;
    /*
    await this.storage.get("user_email").then((val) => {
      console.log("user_email", val);
      emai_storage = val;
    });
    */

    try {
      let data: UsuarioGeneral = this.aus.getUser();
      this.email = data.email;
      let new_url = this.url + this.email;
      let user_data;
      this.http.get(new_url).subscribe((response) => {
        //console.log(response);
        user_data = response;
        //console.log(user_data.carrerasUsuario);
        user_data.carrerasUsuario.forEach((element) => {
          this.carreras.push(element.nombre);
        });
        this.semestre = user_data.semestre;
        this.Nombre = user_data.nombre;
      });
    } catch (error) {
      console.error(error)
    }

    //console.log(data)
  }

  public onBackAction($event) {
    this._location.back();
  }
}
