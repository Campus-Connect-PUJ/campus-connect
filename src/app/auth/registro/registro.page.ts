import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NavController } from "@ionic/angular";
import { LoginService } from "src/app/services/login.service";

@Component({
  selector: "page-register",
  templateUrl: "registro.page.html",
  styleUrls: ["./registro.page.scss"],
})
export class RegistroPage implements OnInit {
  mensajeError: string;
  error_visibility: boolean;

  nombre: string;
  apellido: string;
  email: string;
  password: string;

  constructor(
    public nav: NavController,
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit() {
    this.error_visibility = false;
    this.mensajeError = "";
  }

  // register and go to home page
  async onRegister() {

    // TODO: this.error_visibility = true;
    this.loginService.register(
      this.nombre,
      this.apellido,
      this.email,
      this.password
    ).subscribe(
        results => {
          console.log("ingreso exitoso: ", results)
          this.router.navigate(["formulario_registro"]);
        },
        error => {
          console.error(error);
        }
      );

    try {
      // TODO: hacer registro
      // const user = await this.authSvc.register(email.value, password.value, nombre.value, apellido.value);
      // if (user) {
      //   if (typeof user === "string") {
      //     this.data = user;
      //     this.error_visibility = 1;
      //     if (user == "auth/invalid-email") {
      //       this.data = "Correo ingresado inválido.";
      //     }
      //     if (user == "auth/wrong-password") {
      //       this.data = "Contraseña ingresada inválida.";
      //     }
      //     if (user == "auth/user-not-found") {
      //       this.data = "Usuario inexistente.";
      //     }
      //     if(user == "auth/weak-password"){
      //       this.data = "Contraseña debe ser de al menos 6 caracteres";
      //     }
      //     if(user == "auth/email-already-in-use"){
      //       this.data = "Correo ya existente";
      //     }
      //   }else{
      //     // console.log("User ",user);
      //     // TODO Check email.
      //     console.log("User created.", user);
      //     // Check Email
      //   }
      // }
    } catch (error) {
      console.log("Error -> ", error);
    }
  }

  // go to login page
  login() {
    this.router.navigate(["login"]);
  }
}
