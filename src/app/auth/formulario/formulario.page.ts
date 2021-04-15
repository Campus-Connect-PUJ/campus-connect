import { NavigationExtras, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AlertController } from "@ionic/angular";
import { LoginService } from 'src/app/services/login.service';
import { Carrera } from 'src/app/Model/Carrera/carrera';
import { CarrerasService } from 'src/app/Model/Carrera/carreras.service';

@Component({
  selector: "app-formulario",
  templateUrl: "./formulario.page.html",
  styleUrls: ["./formulario.page.scss"],
})
export class FormularioPage implements OnInit {
  private url = "http://localhost:8080/carreras";
  public carreras = [];
  public carreras_seleccionadas = ["Ninguna"];
  public fechaNacimiento;
  public semestre = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
  public semestre_seleccionado // TODO: limpiar esto
  authState: any = null;

  constructor(
    private http: HttpClient,
    public alertController: AlertController,
    private router: Router,
    private login: LoginService,
    private carrerasService: CarrerasService
  ) {
  }

  async ngOnInit() {
    let result = this.carrerasService.getCarreras();
    let carrerasJson = JSON.parse(JSON.stringify(result));
    carrerasJson.forEach((element: Carrera, i: number) => {
      this.carreras.push([i, element.nombre]);
    });
    console.log(this.carreras);
  }

  onSelectChange(selectedValue: any) {
    let selected_values = selectedValue.detail.value;
    if (selected_values.length == 0) {
      this.carreras_seleccionadas = ["Ninguna"];
    } else {
      this.carreras_seleccionadas = [];
      selected_values.forEach((element) => {
        this.carreras_seleccionadas.push(this.carreras[element][1]);
      });
    }
  }

  onSelectChangeSemestre(selectedValue: any) {
    let selected_values = selectedValue.detail.value;
    if (selected_values.length == 0) {
      this.semestre_seleccionado = null
    } else {
      this.semestre_seleccionado = selectedValue.detail.value;
    }
  }

  async alertaElementoNoSeleccionado(elemento, mensaje) {
    let alert = await this.alertController.create({
      cssClass: "custom-class-alert",
      header: "Error",
      subHeader: elemento,
      message: mensaje,
      buttons: ["OK"],
    });
    await alert.present();
  }

  async completar_registro() {
    let i = 0;
    this.carreras_seleccionadas.forEach((element) => {
      if (element != "Ninguna") {
        i++;
      }
    });
    if (typeof this.fechaNacimiento == "undefined") {
      await this.alertaElementoNoSeleccionado(
        "Fecha de nacimiento seleccionada",
        "Para continuar con el registro debes seleccionar una fecha válida."
      );
    } else if (i == 0) {

      await this.alertaElementoNoSeleccionado(
        "Carrera seleccionada",
        "Para continuar con el registro debes seleccionar al menos una carrera."
      );
    } else if (this.semestre_seleccionado == null) {
      await this.alertaElementoNoSeleccionado(
        "Semestre seleccionado",
        "Para continuar con el registro debes seleccionar el semestre en el cual te encuentras."
      );
    } else {
      const user = this.login.getUser();
      var postCarreras = []
      this.carreras_seleccionadas.forEach(element => {
        postCarreras.push(element)
      });
      let postData = {
        email: user.email,
        name: user.nombre,
        last_name: user.last_name,
        fechaNacimiento: this.fechaNacimiento,
        semestre_seleccionado: this.semestre_seleccionado,
        carreras_seleccionadas: postCarreras,
      };
      const navigationExtras: NavigationExtras = {
        state: {
          postData
        },
      };
      this.router.navigate(["formulario_registro2"], navigationExtras);
    }
    // this.router.navigate(["formulario_registro2"]);
  }
}
