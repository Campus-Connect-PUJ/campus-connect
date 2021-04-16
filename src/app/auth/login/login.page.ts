import { Component, OnInit} from "@angular/core";
import { Router } from "@angular/router";
import { NavController } from "@ionic/angular";
import { UsuarioGeneral } from "src/app/Model/UsuarioGeneral/usuario-general";
import { LoginService } from "src/app/services/login.service";

@Component({
  selector: "page-login",
  templateUrl: "login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  errorMessage: string;
  error_visibility: boolean;

  email: string;
  password: string;

  constructor(
    public nav: NavController,
    private login: LoginService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.error_visibility = false;
    this.errorMessage = "";
  }

  // go to register page
  register() {
    //console.log("Click");
    this.router.navigate(["registro"]);
  }

  // login and go to home page
  onLogin(): void {
    this.login.login(this.email, this.password)
      .subscribe(
        results => {
          console.log("ingreso exitoso: ", results)
          let usuario: UsuarioGeneral = results;
          this.login.storeUser(usuario);
          this.router.navigate(["auth-home"]);
        },
        error => {
          this.error_visibility = true;
          this.errorMessage = error; // TODO: poner un mensaje de error valido
          console.error(error);
          this.password = "";
        }
      );
  }

  forgotPass() {}
}
