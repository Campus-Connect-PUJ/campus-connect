import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { UsuarioGeneral } from 'src/app/Model/UsuarioGeneral/usuario-general';
import { UsuarioGeneralService } from 'src/app/Model/UsuarioGeneral/usuario-general.service';
import { LoginService } from 'src/app/services/login.service';
import { Carrera } from 'src/app/Model/Carrera/carrera';

@Component({
  selector: "app-formulario2",
  templateUrl: "./formulario2.page.html",
  styleUrls: ["./formulario2.page.scss"],
})
export class Formulario2Page implements OnInit {
  public religiones = [
    ["BUDI", "Budismo"],
    ["CATO", "Catolicismo"],
    ["CRIS", "Otras Denominaciones Cristianas"],
    ["HIND", "Hinduismo"],
    ["ISLA", "Islamismo"],
    ["JUD", "Judaísmo"],
    ["N/A", "Ninguna"],
    ["OTRA", "Otra"],
  ];
  public grupo_etnicos = [
    ["AFROCOL", "Afrocolombiano"],
    ["GITANO", "Gitano"],
    ["INDÍGENA", "Indígena"],
    ["NINGUNO", "Ninguno"],
    ["OTRO", "Otro"],
    ["RAIZAL", "Raizal"],
  ];
  public generos = ["Hombre", "Mujer", "LGTBI", "Prefiero no decirlo"];

  public sexos = ["Masculino", "Femenino", "Prefiero no decirlo"];

  // user_data: UsuarioGeneral = new UsuarioGeneral("","","");
  religion: string = "";
  ethnicity: string = "";
  local: string = "";
  gender: string = "";
  sex: string = "";

  fechaNacimiento: Date;

  carreras: Carrera[] = [];

  constructor(
    private router: Router,
    public alertController: AlertController,
    private ugService: UsuarioGeneralService,
    private login: LoginService
  ) {}

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    const postData = navigation.extras.state;
    const datos = postData.postData;

    this.fechaNacimiento = datos.fechaNacimiento;
    this.carreras = datos.carreras;
  }

  onBirthChange(selectedValue: any) {
    let selected_values = selectedValue.detail.value;
    this.local = selected_values;
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
    if (this.religion.length === 0) {
      await this.alertaElementoNoSeleccionado(
        "Creencia no seleccionada",
        "Para continuar con el registro debes seleccionar una creencia válida."
      );
    } else if (this.ethnicity.length === 0) {
      await this.alertaElementoNoSeleccionado(
        "Etnia no seleccionada",
        "Para continuar con el registro debes seleccionar una étnia válida."
      );
    } else if (this.local.length === 0) {
      await this.alertaElementoNoSeleccionado(
        "Lugar de nacimiento no seleccionado",
        "Para continuar con el registro debes responder la pregunta de tu lugar de nacimiento."
      );
    } else if (this.gender.length === 0) {
      await this.alertaElementoNoSeleccionado(
        "Género no seleccionado",
        "Para continuar con el registro responder la pregunta de orientación de género."
      );
    } else if (this.sex.length === 0) {
      await this.alertaElementoNoSeleccionado(
        "Sexo no seleccionado",
        "Para continuar con el registro responder la pregunta del sexo."
      );
    } else {  //Datos completos
      const user_data = this.login.getUser();
      this.ugService.agregarInformacionUsuario(
        user_data.id, // esto tal vez se podria meter en un objeto, pero meh
        this.fechaNacimiento,
        this.carreras,
        this.religion,
        this.local == "true",
        this.ethnicity,
        this.sex,
        this.gender
      ).subscribe(
        results => {
          console.log("ingreso exitoso: ", results)
          this.router.navigate(["auth-home"]);
        },
        error => {
          console.error(error);
        }
      );
    }
  }
}
