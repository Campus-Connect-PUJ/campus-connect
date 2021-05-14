import { Component, OnInit } from '@angular/core';
import { GrupoEstudiantil } from '../../Model/GrupoEstudiantil/grupo-estudiantil';
import { GrupoEstudiantilService } from '../../Model/GrupoEstudiantil/grupo-estudiantil.service';
import { Router } from '@angular/router';

import { NavController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';

import { FormularioPersoGruposPage } from '../formulario-perso-grupos/formulario-perso-grupos.page';
import { Tematica } from 'src/app/Model/Tematica/tematica';
import { TematicaService } from 'src/app/Model/Tematica/tematica.service';
import { Facultad } from 'src/app/Model/Facultad/facultad';
import { FacultadService } from 'src/app/Model/Facultad/facultad.service';


@Component({
  selector: 'app-reco-grupos',
  templateUrl: './reco-grupos.page.html',
  styleUrls: ['./reco-grupos.page.scss'],
})
export class RecoGruposPage implements OnInit {

  grupos: GrupoEstudiantil[] = [];
  tematicas: Tematica[] = [];
  facultades: Facultad[] = [];
  textoBuscar='';
  facultadSelect='';
  tematicaSelect='';

  collapseCard = true;

  constructor(
    private geService: GrupoEstudiantilService,
    public router: Router,
    public navCtrl : NavController,
    private modalController :ModalController,
    private tematicasService : TematicaService,
    private facService : FacultadService
  ) { }

  ngOnInit() {
    this.findGrupos();
    this.findTematica();
    this.findFacultad();
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

  findTematica() {
    this.tematicasService.getTematicas().subscribe(
      results => {
        console.log(results);
        this.tematicas = results;
      },
      error => console.error(error)
    )
  }

  findFacultad() {
    this.facService.getFacultades().subscribe(
      results => {
        console.log(results);
        this.facultades = results;
      },
      error => console.error(error)
    )
  }

  buscarGrupoTematics(event){
    const texto = event.target.value;
    this.tematicaSelect = texto;
  }

  buscarGrupoFacultad(event){
    const texto = event.target.value;
    this.facultadSelect= texto;

    console.log(this.facultadSelect);
  }

  loadData($event){
    setTimeout(() => {
      this.findGrupos()
    }, 300);
    
  }


}
