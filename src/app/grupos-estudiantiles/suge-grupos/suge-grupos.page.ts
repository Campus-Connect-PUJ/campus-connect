import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GrupoEstudiantil } from 'src/app/Model/GrupoEstudiantil/grupo-estudiantil';
import { GrupoEstudiantilService } from 'src/app/Model/GrupoEstudiantil/grupo-estudiantil.service';
import { UsuarioGeneral } from 'src/app/Model/UsuarioGeneral/usuario-general';
import { LoginService } from 'src/app/services/login.service';
import { FormularioPersoGruposPage } from '../formulario-perso-grupos/formulario-perso-grupos.page';

@Component({
  selector: 'app-suge-grupos',
  templateUrl: './suge-grupos.page.html',
  styleUrls: ['./suge-grupos.page.scss'],
})
export class SugeGruposPage implements OnInit {

  grupos: GrupoEstudiantil[] = [];
  usuario: UsuarioGeneral;
  gruposT: GrupoEstudiantil[] = [];
  
  constructor(
    private loginService: LoginService,
    private modalController :ModalController,
    private geService: GrupoEstudiantilService
  ) { }

  ngOnInit() {
    this.usuario = this.loginService.getUser();
    console.log(this.usuario.caracteristicas.length);
    if(this.usuario.caracteristicas.length===0){
      this.openModal();
    }else{
      this.findGrupos();
    }
    
  }

  findGrupos() {
    this.geService.getGrupos().subscribe(
      results => {
        console.log(results);
        this.gruposT = results;
        for(let i=0; i<this.usuario.caracteristicas.length; i++){
          for (let j=0;j<this.gruposT.length;j++){
            if(this.gruposT[j].caracteristicas.some(car => car.nombre === this.usuario.caracteristicas[i].nombre)){
              if(this.grupos.includes(this.gruposT[j])){
                this.grupos.push(this.gruposT[j]);
              }
            }
          }
        }
      },
      error => console.error(error)
    )
  }

  infoGrupos(){

  }

  openModal(){
    this.modalController.create({component:FormularioPersoGruposPage}).then((modalElement)=>{
      modalElement.present();
    });
  }
}
