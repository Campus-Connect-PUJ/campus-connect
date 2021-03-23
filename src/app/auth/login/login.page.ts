import {Component} from "@angular/core";
import { Router } from "@angular/router";
import {NavController, AlertController, ToastController, MenuController} from "@ionic/angular";
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: "page-login",
  templateUrl: "login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage {
  constructor(public nav: NavController, private authSvc: AuthService, private router: Router) {

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
        console.log("User validated.", user);
        this.router.navigate(["auth-home"]);
      }
    } catch (error) {
      console.log("Error -> ", error);
    }
  }

  forgotPass() {}
}
