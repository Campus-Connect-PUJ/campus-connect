import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AlertController, NavController } from "@ionic/angular";
import { UsuarioGeneral } from "src/app/Model/UsuarioGeneral/usuario-general";
import { LoginService } from "src/app/services/login.service";

@Component({
  selector: "page-register",
  templateUrl: "registro.page.html",
  styleUrls: ["./registro.page.scss"],
})
export class RegistroPage implements OnInit {
  mensajeError: string;
  error_visibility: boolean;

  public semestres = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]

  nombre: string = "";
  apellido: string = "";
  email: string = "";
  password: string = "";
  semestre: number = NaN;

  constructor(
    public alertController: AlertController,
    public nav: NavController,
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit() {
    this.error_visibility = false;
    this.mensajeError = "";
  }

  async alertaElementoNoSeleccionado(elemento: string, mensaje: string) {
    let alert = await this.alertController.create({
      cssClass: "custom-class-alert",
      header: "Error",
      subHeader: elemento,
      message: mensaje,
      buttons: ["OK"],
    });
    await alert.present();
  }

  // register and go to home page
  async onRegister() {

    if (this.nombre.length === 0) {
      await this.alertaElementoNoSeleccionado(
        "Nombre de usuario vacío",
        "Para continuar con el registro se debe ingresar un nombre."
      );
    } else if (this.apellido.length === 0) {
      await this.alertaElementoNoSeleccionado(
        "Apellido vacío",
        "Para continuar con el registro se debe ingresar un apellido."
      );
    } else if (this.email.length === 0) { // TODO: hacer validacion del correo
      await this.alertaElementoNoSeleccionado(
        "Correo vacío",
        "Para continuar con el registro se debe ingresar un correo valido."
      );
    } else if (this.password.length === 0) {
      await this.alertaElementoNoSeleccionado(
        "Contraseña vacía",
        "Para continuar con el registro se debe ingresar una contraseña."
      );
    } else if (Number.isNaN(this.semestre)) {
      await this.alertaElementoNoSeleccionado(
        "Semestre no seleccionado",
        "Para continuar con el registro debes seleccionar el semestre en el cual te encuentras."
      );
    } else {
      this.loginService.register(
        this.nombre,
        this.apellido,
        this.email,
        this.password,
        this.semestre
      ).subscribe(
        results => {
          console.log("ingreso exitoso: ", results)
          const usuario: UsuarioGeneral = results;
          this.loginService.storeUser(usuario);
          this.router.navigate(["formulario_registro"]);
        },
        error => {
          this.error_visibility = true;
          this.mensajeError = error;
          console.error(error);
        }
      );
    }
  }

  // go to login page
  login() {
    this.router.navigate(["login"]);
  }
}
