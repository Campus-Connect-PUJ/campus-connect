import {Component} from "@angular/core";
import {NavController, AlertController, ToastController, MenuController} from "@ionic/angular";
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'page-login',
  templateUrl: 'login.page.html'
})
export class LoginPage {

  constructor(public nav: NavController, private authSvc: AuthService) {
    //this.menu.swipeEnable(false);
  }

  // go to register page
  register() {
    //this.nav.setRoot(RegisterPage);
  }

  // login and go to home page
  async onLogin(email,password) {
    try{
      const user = await this.authSvc.login(email.value, password.value);
      if(user){
        //Todo: Check Email.
        console.log("User validated.",user)
      }
    }
    catch(error){
      console.log('Error -> ',error)
    }
  }

  forgotPass() {
    
  }

}
