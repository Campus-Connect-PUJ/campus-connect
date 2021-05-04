import { Component, OnInit } from '@angular/core';
import { UsuarioGeneral } from '../Model/UsuarioGeneral/usuario-general';
import { UsuarioGeneralService } from '../Model/UsuarioGeneral/usuario-general.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-contribuciones',
  templateUrl: './contribuciones.page.html',
  styleUrls: ['./contribuciones.page.scss'],
})
export class ContribucionesPage implements OnInit {
  indice: number;
  user: UsuarioGeneral;
  esMonitor: boolean = false;

  constructor(
    private userService: UsuarioGeneralService,
    private logService: LoginService,
  ) { 
    this.user = JSON.parse(sessionStorage.getItem("user"));
    this.indice = this.user.id;
  }

  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem("user"));
    this.indice = this.user.id;
    this.ngOnDestroy();
  }

  ngOnDestroy() {

  }

  cambiarRol(){
    let idRol = 1;
    if(this.user.roles.includes("MONITOR")){
      idRol = 1;
    }
    else{
      idRol = 2;
    }
    console.log("esta con el rol ", this.user);
    this.userService.cambiarRol(this.user.id, idRol).subscribe(
      results => {
        this.user = results;
        console.log("Si sirvio ", this.user)
      },
      error => console.error(error)
    );
    /*
    this.userService.getUsuario(this.user.id).subscribe(
      results => {
        this.user = results;
        sessionStorage.setItem('user', JSON.stringify(this.user));
        console.log("Si sirvio ", this.user)
      },
      error => console.error(error)
    )
    */
  }

  quitarChat(){
    const element = document.getElementsByClassName('chatbot') as HTMLCollectionOf<HTMLElement>;
    element[0].style.display = 'none'
    element[0].style.marginBottom = '50px';
  }

  

}
