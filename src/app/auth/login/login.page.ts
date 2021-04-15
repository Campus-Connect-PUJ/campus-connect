import { Component, ElementRef, ViewChild, Directive , OnInit} from "@angular/core";
import { Router } from "@angular/router";
import { NavController, AlertController, ToastController, MenuController } from "@ionic/angular";
import { LoginService } from "src/app/services/login.service";

@Component({
  selector: "page-login",
  templateUrl: "login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  data: string;
  error_visibility: number;

  email: string;
  password: string;

  constructor(
    public nav: NavController,
    private login: LoginService,
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
  onLogin() {
    // console.log(JSON.stringify(email));
    // console.log(JSON.stringify(password));
    // console.log(this.email + " " + this.password);
    this.login.login(this.email, this.password)
      .subscribe(
        results => {
          console.log("ingreso exitoso: ", results)
          this.router.navigate(["auth-home"]);
        },
        error => {
          console.error(error);
          this.password = "";
        }
      )
  }

  forgotPass() {}
}
