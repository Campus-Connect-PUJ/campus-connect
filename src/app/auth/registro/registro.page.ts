import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NavController } from "@ionic/angular";
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

  nombre: string;
  apellido: string;
  email: string;
  password: string;
  semestre: number;

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

  // go to login page
  login() {
    this.router.navigate(["login"]);
  }
}
