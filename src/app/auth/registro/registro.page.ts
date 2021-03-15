import { Component } from "@angular/core";
import { NavController } from "@ionic/angular";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "page-register",
  templateUrl: "registro.page.html",
})
export class RegistroPage {
  constructor(public nav: NavController, private authSvc: AuthService) {}

  // register and go to home page
  async onRegister(nombre, apellido, email, password) {
    try {
      const user = await this.authSvc.register(email.value,password.value);
      if(user){
        // console.log("User ",user);
        // TODO Check email. 
        // Check Email
      }
    } catch (error) {
      console.log("Error -> ", error);
    }
    //this.nav.setRoot(HomePage);
  }

  // go to login page
  login() {
    //this.nav.setRoot(LoginPage);
  }
}
