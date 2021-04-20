import { Component, OnInit} from "@angular/core";
import { Router } from "@angular/router";
import { AlertController, NavController } from "@ionic/angular";
import { UsuarioGeneral } from "src/app/Model/UsuarioGeneral/usuario-general";
import { LoginService } from "src/app/services/login.service";

@Component({
  selector: "page-login",
  templateUrl: "login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  email: string = "";
  password: string = "";

  constructor(
    public nav: NavController,
    public alertController: AlertController,
    private login: LoginService,
    private router: Router
  ) {
  }

  ngOnInit() {
  }

  // go to register page
  register() {
    //console.log("Click");
    this.router.navigate(["registro"]);
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

  // login and go to home page
  async onLogin() {
    if (this.email.length === 0) { // TODO: hacer validacion del correo
      await this.alertaElementoNoSeleccionado(
        "Correo vacío",
        "Para continuar con el registro se debe ingresar un correo valido."
      );
    } else if (this.password.length === 0) {
      await this.alertaElementoNoSeleccionado(
        "Contraseña vacía",
        "Para continuar con el registro se debe ingresar una contraseña."
      );
    } else {
      this.login.login(this.email, this.password)
        .subscribe(
          results => {
            // console.log("ingreso exitoso: ", results)
            // console.log(results.headers)
            const usuario: UsuarioGeneral = results.body;

            this.login.storeUser(usuario, results.headers.get('authorization'));
            this.router.navigate(["auth-home"]);
          },
          error => {
            console.error(error);
            this.password = "";
          }
        );
    }
  }

  forgotPass() {}
}
