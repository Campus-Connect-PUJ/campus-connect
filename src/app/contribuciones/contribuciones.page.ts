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
    
    //this.user = JSON.parse(sessionStorage.getItem("user"));
    //this.indice = this.user.id;
  }

  ngOnInit() {
    try {
      this.user = JSON.parse(sessionStorage.getItem("user"));
      this.indice = this.user.id;
      this.mostrarChat();
    } catch (error) {
      
    }
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
    this.userService.cambiarRol(this.user.id, idRol).subscribe(
      results => {
        this.user = results;
      },
      error => console.error(error)
    );

  }

  quitarChat(){
    const element = document.getElementsByClassName('chatbot') as HTMLCollectionOf<HTMLElement>;
    element[0].style.display = 'none'
    element[0].style.marginBottom = '50px';
  }

  mostrarChat(){
    const element = document.getElementsByClassName('chatbot') as HTMLCollectionOf<HTMLElement>;
    /*
    let shadow = element[0].shadowRoot;
    element[0].attachShadow({mode:"open"})
    shadow = element[0].shadowRoot;
    console.log("->", shadow);
    */
    element[0].style.display = 'flex';
    
  }
  

}
