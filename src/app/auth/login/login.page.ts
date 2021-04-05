import { Component, ElementRef, ViewChild, Directive , OnInit} from "@angular/core";
import { Router } from "@angular/router";
import {NavController, AlertController, ToastController, MenuController} from "@ionic/angular";
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: "page-login",
  templateUrl: "login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  data: string;
  error_visibility: number;

  constructor(
    public nav: NavController,
    private authSvc: AuthService,
    private router: Router
  ) {
    this.error_visibility = 0;
    this.data = "";
  }

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

  // go to register page
  register() {
    //console.log("Click");
    this.router.navigate(["registro"]);
  }

  // login and go to home page
  async onLogin(email, password) {
    try {
      const user = await this.authSvc.login(email.value, password.value);
      if (user) {
        //Todo: Check Email.
        if (typeof user === "string") {
          console.log("Error ", user);
          this.data = user;
          this.error_visibility = 1;
          if (user == "auth/invalid-email") {
            this.data = "Correo ingresado inválido."
          }
          if (user == "auth/wrong-password") {
            this.data = "Contraseña ingresada inválida.";
          }
          if (user == "auth/user-not-found") {
            this.data = "Usuario inexistente.";
          }
        } else {
          console.log(typeof user);
          console.log("User validated.", user);
          this.router.navigate(["auth-home"]);
        }
      }
    } catch (error) {
      console.log("Error -> ", error);
    }
  }

  forgotPass() {}
}
