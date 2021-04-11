import { UsuarioGeneral } from 'src/app/Model/UsuarioGeneral/usuario-general';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  user: UsuarioGeneral =  new UsuarioGeneral("usuario1", "correo1@hotmail.com", 8);

  constructor() { }

  ngOnInit() {
  }

  cambiarUsuario(){

    this.user = JSON.parse(localStorage.getItem("Usuario"));

    if(this.user.correo === "correo1@hotmail.com"){
      this.user.nombre = "usuario2";
      this.user.correo =  "correo2@hotmail.com";
      this.user.semestre = 1;
      this.user.id = 2;
      console.log("entra")
    }
    else{
      this.user.nombre = "usuario1";
      this.user.correo =  "correo1@hotmail.com";
      this.user.semestre = 8;
      this.user.id = 1;
    }

    localStorage.setItem("Usuario", JSON.stringify(this.user))
    
  }

}
