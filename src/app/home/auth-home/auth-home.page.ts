import { Component, OnInit } from '@angular/core';
import { LoginService } from "../../services/login.service";
import { Router } from '@angular/router';

@Component({
  selector: "app-auth-home",
  templateUrl: "./auth-home.page.html",
  styleUrls: ["./auth-home.page.scss"],
})
export class AuthHomePage implements OnInit {
  constructor(
    private login: LoginService,
    private router: Router
  ) {
    const usr = this.login.getUser();
    // console.log("informacion: " + JSON.stringify(usr.informacionUsuario));
    if (!usr.informacionUsuario) {
      this.router.navigate(["formulario_registro"]);
    }
  }

  ngOnInit() {
  }

  logout() {
    this.login.logout();
  }
}
