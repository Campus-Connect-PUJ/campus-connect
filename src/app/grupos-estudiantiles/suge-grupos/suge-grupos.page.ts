import { Component, OnInit } from '@angular/core';
import { GrupoEstudiantil } from 'src/app/Model/GrupoEstudiantil/grupo-estudiantil';
import { UsuarioGeneral } from 'src/app/Model/UsuarioGeneral/usuario-general';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-suge-grupos',
  templateUrl: './suge-grupos.page.html',
  styleUrls: ['./suge-grupos.page.scss'],
})
export class SugeGruposPage implements OnInit {

  grupos: GrupoEstudiantil[] = [];
  usuario: UsuarioGeneral;
  
  constructor(
    private loginService: LoginService
  ) { }

  ngOnInit() {
    this.usuario = this.loginService.getUser();
    this.findGrupos();
  }

  findGrupos() {
    this.grupos=this.usuario.gruposSugeridos;
  }

  infoGrupos(){
    
  }
}
