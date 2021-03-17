import { Component, OnInit } from '@angular/core';
import { GrupoEstudiantil } from '../shared/grupo-estudiantil';
import { GrupoEstudiantilService } from '../shared/grupo-estudiantil.service';
import { Router } from '@angular/router';

import { DatosGrupoPage } from './datos-grupo/datos-grupo.page';
import { NavController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';

import {FormularioPersoGruposPage} from '../formulario-perso-grupos/formulario-perso-grupos.page';

@Component({
  selector: 'app-reco-grupos',
  templateUrl: './reco-grupos.page.html',
  styleUrls: ['./reco-grupos.page.scss'],
})
export class RecoGruposPage implements OnInit {

  grupos: GrupoEstudiantil[] = [];
  textoBuscar='';

  constructor(
    private geService: GrupoEstudiantilService,
    public router: Router,
    public navCtrl : NavController,
    private modalController :ModalController
  ) { }

  ngOnInit() {
    this.findGrupos();
  }

  findGrupos() {
    this.geService.getGrupos().subscribe(
      results => {
        console.log(results);
        this.grupos = results;
      },
      error => console.error(error)
    )
  }

  buscarGrupoEstudiantil(event){
    const texto = event.target.value;
    this.textoBuscar = texto;
    
  }

  infoGrupo(){
    
  }

  openModal(){
    this.modalController.create({component:FormularioPersoGruposPage}).then((modalElement)=>{
      modalElement.present();
    });
  }
}
