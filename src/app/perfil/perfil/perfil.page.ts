import { user_data } from './../../model/shared/user_data';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: "app-perfil",
  templateUrl: "./perfil.page.html",
  styleUrls: ["./perfil.page.scss"],
})
export class PerfilPage implements OnInit {
  private url = "http://localhost:8080/usuario/email/";
  public email = null;
  public semestre = null;
  public Nombre = null;
  public carreras = [];
  constructor(private http: HttpClient, private storage: Storage, private aus: AuthService) {}

  async ngOnInit() {
    let emai_storage
    await this.storage.get("user_email").then((val) => {
      console.log("user_email", val);
      emai_storage = val;
    });
    let data = await this.aus.getUserdata(emai_storage);
    this.email = data.email;
    let new_url = this.url + this.email;
    let user_data;
    this.http.get(new_url).subscribe((response) => {
      //console.log(response);
      user_data = response;
      //console.log(user_data.carrerasUsuario);
      user_data.carrerasUsuario.forEach(element => {
        this.carreras.push(element.nombre)
      });
      this.semestre = user_data.semestre;
      this.Nombre = user_data.nombre;
    });
    //console.log(data)
  }
}
