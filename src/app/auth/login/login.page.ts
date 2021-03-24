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
  }

  ngOnInit() {
    this.error_visibility = 0;
  }

  ngOnDestroy(){
    this.error_visibility = 0;
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
          //this.error_message.style.visibility = "visible";
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
