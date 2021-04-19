import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { LoginService } from "../../services/login.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    private login: LoginService,
    private router: Router
  ) {

    if (this.login.getUser()) {
      this.router.navigate(["auth-home"]);
    }
  }

  ngOnInit() {

  }

}
