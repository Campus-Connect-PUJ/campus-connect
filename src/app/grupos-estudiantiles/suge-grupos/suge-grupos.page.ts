import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GrupoEstudiantil } from 'src/app/Model/GrupoEstudiantil/grupo-estudiantil';
import { Caracteristica } from 'src/app/Model/Caracteristica/caracteristica';
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

  constructor(
    private loginService: LoginService,
    private modalController: ModalController,
    private geService: GrupoEstudiantilService
  ) {
    this.usuario = this.loginService.getUser();
  }

  ngOnInit() {
    this.verificarUsuario();
  }

  verificarUsuario() {
    try {
      if(this.usuario.caracteristicas.length===0){
        this.openModal();
      }else{
        this.findGrupos();
      }
    } catch (error) {
      console.error(error);
    }

  }

  findGrupos() {
    this.geService.getGrupos().subscribe(
      (results: GrupoEstudiantil[]) => {
        // console.log(results);
        const gruposT = results;
        for(let i=0; i<this.usuario.caracteristicas.length; i++){
          for (let j=0;j<gruposT.length;j++){
            // console.log(JSON.stringify(gruposT[j]))
            if(gruposT[j].caracteristicas.some(
              (car: Caracteristica) => car.nombre === this.usuario.caracteristicas[i].nombre)
              ){
              if(!this.grupos.includes(gruposT[j])){
                this.grupos.push(gruposT[j]);
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

  async openModal(){
    const modal = await this.modalController.create(
      {component: FormularioPersoGruposPage}
    );
    modal.onDidDismiss().then( () => {
      this.usuario = this.loginService.getUser();
      this.verificarUsuario();
    });
    await modal.present();
  }
}
