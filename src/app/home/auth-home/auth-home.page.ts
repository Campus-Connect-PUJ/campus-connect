import { Component, OnInit } from '@angular/core';
import { LoginService } from "../../services/login.service";

@Component({
  selector: "app-auth-home",
  templateUrl: "./auth-home.page.html",
  styleUrls: ["./auth-home.page.scss"],
})
export class AuthHomePage implements OnInit {
  constructor(
    private login: LoginService
  ) {
  }

  ngOnInit() {}

  logout() {

    this.login.logout();

  }
}
