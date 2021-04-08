import { UsuarioGeneralService } from './../../Model/UsuarioGeneral/usuario-general.service';
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NavController } from "@ionic/angular";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "page-register",
  templateUrl: "registro.page.html",
  styleUrls: ["./registro.page.scss"],
})
export class RegistroPage implements OnInit {
  data: string;
  error_visibility: number;

  constructor(
    public nav: NavController,
    private authSvc: AuthService,
    private router: Router, 
    private userService: UsuarioGeneralService
  ) {}

  ngOnInit() {
    this.error_visibility = 0;
    this.data = "";
  }

  ngOnDestroy() {
    this.error_visibility = 0;
    this.data = "";
  }

  //Fired when the component routing to is about to animate into view.
  ionViewWillEnter() {
    this.error_visibility = 0;
    this.data = "";
  }

  //Fired when the component routing to has finished animating.
  ionViewDidEnter() {
    this.error_visibility = 0;
    this.data = "";
  }

  //Fired when the component routing from is about to animate.
  ionViewWillLeave() {
    this.error_visibility = 0;
    this.data = "";
  }

  //Fired when the component routing to has finished animating.
  ionViewDidLeave() {
    this.error_visibility = 0;
    this.data = "";
  }

  // register and go to home page
  async onRegister(nombre, apellido, email, password) {
    try {
      const user = await this.authSvc.register(email.value, password.value, nombre.value, apellido.value);
      if (user) {
        if (typeof user === "string") {
          this.data = user;
          this.error_visibility = 1;
          if (user == "auth/invalid-email") {
            this.data = "Correo ingresado inválido.";
          }
          if (user == "auth/wrong-password") {
            this.data = "Contraseña ingresada inválida.";
          }
          if (user == "auth/user-not-found") {
            this.data = "Usuario inexistente.";
          }
          if(user == "auth/weak-password"){
            this.data = "Contraseña debe ser de al menos 6 caracteres";
          }
          if(user == "auth/email-already-in-use"){
            this.data = "Correo ya existente";
          }
        }else{
          // console.log("User ",user);
          // TODO Check email.
          console.log("User created.", email.value);
          this.userService.correo = email.value;
          this.userService.nombreUsuario = nombre.value;
          console.log("el correo es ", email.value)
          this.router.navigate(["formulario_registro"]);
          // Check Email
        }
      }
    } catch (error) {
      console.log("Error -> ", error);
    }
  }

  // go to login page
  login() {
    this.router.navigate(["login"]);
  }
}
