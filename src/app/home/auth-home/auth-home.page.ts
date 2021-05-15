import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { LoginService } from "../../services/login.service";

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
    // console.log("informacion: " + JSON.stringify(usr.informacion));
    if (!usr.informacion) {
      this.router.navigate(["formulario_registro"]);
    }
  }

  ngOnInit() {
  }

  logout() {
    this.login.logout();
  }
}
