import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Caracteristica } from 'src/app/Model/Caracteristica/caracteristica';
import { CaracteristicaService } from 'src/app/Model/Caracteristica/caracteristica.service';
import { Tematica } from 'src/app/Model/Tematica/tematica';
import { TematicaService } from 'src/app/Model/Tematica/tematica.service';


export class actividad{
  nombre: String;
  constructor(n){
    this.nombre = n;
  }
}

@Component({
  selector: 'app-formulario-perso-grupos',
  templateUrl: './formulario-perso-grupos.page.html',
  styleUrls: ['./formulario-perso-grupos.page.scss'],
})

export class FormularioPersoGruposPage implements OnInit {

  tematicas: Tematica[]=[];
  caracteristicas: Caracteristica[]=[];
  actividades: Array<actividad> = [ new actividad(" ")];
  hobbies: Array<actividad> = [ new actividad(" ")];

  tematicasUsuario: Tematica[]=[];
  caracteristicasUsuario: Caracteristica[]=[];
  creenciaUsuario: Boolean;

  textoBuscar='';

  constructor(
    private modalController:ModalController, 
    private tematicasService: TematicaService, 
    private caracteristicaService: CaracteristicaService) { }

  ngOnInit() {
    this.findTematica();
    this.findCaracteristica(); 
  }

  closeModal(){
    this.modalController.dismiss();
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

  findCaracteristica(){
    this.caracteristicaService.getCaracteristicas().subscribe(
      results => {
        console.log(results);
        this.caracteristicas = results;
      },
      error => console.error(error)
    )
  }

  masActividad(){
    this.actividades.push(new actividad(" "));
    console.log(this.actividades)
  }

  masHobbies(){
    this.hobbies.push(new actividad(" "));
    console.log(this.hobbies)
  }

  onClickTematica(tematica){
    this.tematicasUsuario.push(tematica);
    console.log(this.tematicasUsuario);
  }

  onClickCaracteristica(caracteristica){
    this.caracteristicasUsuario.push(caracteristica);
    console.log(this.caracteristicasUsuario);
  }

  onClickCreencia(event){
    const creecnia = event.target.value;
    this.creenciaUsuario =creecnia;
    console.log(this.creenciaUsuario);
  }

  guardar(){
    console.log("Enviar datos al back")
  }

  buscarCaracteristica(event){
    const texto = event.target.value;
    this.textoBuscar= texto;
  }
}
