import { UsuarioGeneral } from 'src/app/Model/UsuarioGeneral/usuario-general';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  user: UsuarioGeneral =  new UsuarioGeneral("usuario1", "correo1@hotmail.com", " ");

  constructor() { }

  ngOnInit() {
  }

  cambiarUsuario(){


    
  }

  MostrarChat(){
    console.log("Mostrar")
    
  }

  cargar(){
    //window.location.reload("tabs/contribuciones");
  }

}
