  
import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { LoginService } from '../services/login.service';
import { UsuarioGeneralService } from '../Model/UsuarioGeneral/usuario-general.service';
import { UsuarioGeneral } from '../Model/UsuarioGeneral/usuario-general';

@Component({
  selector: 'app-servicios-academicos',
  templateUrl: './servicios-academicos.page.html',
  styleUrls: ['./servicios-academicos.page.scss'],
})
export class ServiciosAcademicosPage implements OnInit {
  @ViewChild("myDiv") divView: ElementRef;
  colorList = ['green', 'blue'];
  usuarioActual: UsuarioGeneral;

  constructor(
    private loginService: LoginService,
    private userService: UsuarioGeneralService

  ) {
    console.log("aaa1")
    //this.mostrarChat();
    
  }

  ngOnInit() {
    console.log("aaa2")
    this.mostrarChat();
    //let element = document.getElementsByClassName('chatbot') as HTMLCollectionOf<HTMLElement>;
    //element[0].style.display = 'inline';
    //element[0].style.marginBottom = '50px';
  }

  ngOnDestroy() {
    console.log("bbb")
  }

  updateColor(color) {
    document.documentElement.style.setProperty(`--color`, color);
  }

  mostrarChat(){
    console.log("Mostrar")
    const element = document.getElementsByClassName('chatbot') as HTMLCollectionOf<HTMLElement>;
    /*
    let shadow = element[0].shadowRoot;
    element[0].attachShadow({mode:"open"})
    shadow = element[0].shadowRoot;
    console.log("->", shadow);
    */
    element[0].style.display = 'flex';
    
  }

  quitarChat(){
    const element = document.getElementsByClassName('chatbot') as HTMLCollectionOf<HTMLElement>;
    element[0].style.display = 'none'
    element[0].style.marginBottom = '50px';
  }

  obtenerUsuario(){
    this.usuarioActual = this.loginService.getUser();
    this.userService.getUsuario().subscribe(
      result => {
        this.usuarioActual = result
        this.loginService.storeUser(this.usuarioActual, this.loginService.getToken())
      },
      error => console.error()
    )
    this.quitarChat();
  }



}
