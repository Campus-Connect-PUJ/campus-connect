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


  MostrarChat(){

    
  }
  
  quitarChat(){
    const element = document.getElementsByClassName('chatbot') as HTMLCollectionOf<HTMLElement>;
    element[0].style.display = 'none'
    element[0].style.marginBottom = '50px';
  }

}
