import { Component, OnInit } from '@angular/core';
import {ModalController} from '@ionic/angular';
import { RegimenAlimenticio } from 'src/app/Model/RegimenAlimenticio/regimen-alimenticio';
import { RegimenAlimenticioService } from 'src/app/Model/RegimenAlimenticio/regimen-alimenticio.service';
import { TipoComida } from 'src/app/Model/TipoComida/tipo-comida';
import { TipoComidaService } from 'src/app/Model/TipoComida/tipo-comida.service';

@Component({
  selector: 'app-formulario-perso-restaurantes',
  templateUrl: './formulario-perso-restaurantes.page.html',
  styleUrls: ['./formulario-perso-restaurantes.page.scss'],
})
export class FormularioPersoRestaurantesPage implements OnInit {

  regimenes : RegimenAlimenticio[]=[];
  comidas: TipoComida[]=[];

  regimenUsuario: RegimenAlimenticio = new RegimenAlimenticio();
  comidasUsuario: TipoComida[]=[];
  nivelExigencia='';
  ambientacion='';

  constructor(private modalController : ModalController, private regimenService:RegimenAlimenticioService, private tcService:TipoComidaService) { }

  ngOnInit() {
    this.findRegimenes();
    this.findComida();
  }

  closeModal(){
    this.modalController.dismiss();
  }

  findRegimenes() {
    this.regimenService.getRegimenAlimenticios().subscribe(
      results => {
        console.log(results);
        this.regimenes = results;
      },
      error => console.error(error)
    )
  }

  findComida() {
    this.tcService.getTipoComida().subscribe(
      results => {
        console.log(results);
        this.comidas = results;
      },
      error => console.error(error)
    )
  }

  onClickRegimen(event){
    const regimen = event.target.value;
    this.regimenService.getRegimenAlimenticioById(regimen).subscribe(
      results => {
        console.log(results);
        this.regimenUsuario = results;
      },
      error => console.error(error)
    )
    console.log(this.regimenUsuario.tipo);
  }
  onClickRegimenNivel(event){
    const nivel = event.target.value;
    this.nivelExigencia=nivel;
    console.log(this.nivelExigencia);
  }
  onClickComida(comida){
    this.comidasUsuario.push(comida);
    console.log(this.comidasUsuario);
  }
  onClickAmbientacion(event){
    const ambien = event.target.value;
    this.ambientacion = ambien;
    console.log(this.ambientacion);
  }
  guardar(){
    console.log("enviar info al back");
  }
}
