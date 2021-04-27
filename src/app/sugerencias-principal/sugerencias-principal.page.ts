import { Component, OnInit } from '@angular/core';
import { UsuarioGeneral } from '../Model/UsuarioGeneral/usuario-general';
import { UsuarioGeneralService } from '../Model/UsuarioGeneral/usuario-general.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-sugerencias-principal',
  templateUrl: './sugerencias-principal.page.html',
  styleUrls: ['./sugerencias-principal.page.scss'],
})
export class SugerenciasPrincipalPage implements OnInit {

  usuario: UsuarioGeneral;
  
  constructor(
    private loginService: LoginService,
    private usuarioService: UsuarioGeneralService
  ) { }

  ngOnInit() {
  }

  paso(){
    this.usuario = this.loginService.getUser();
    this.usuarioService.getUsuario(this.usuario.id).subscribe(
      result => {this.usuario = result
                this.loginService.storeUser(this.usuario, this.loginService.getToken())
                  console.log("user", this.usuario)


      },
      error => console.error()
    )

  }

  pasoRestaurantes(){

  }
}
