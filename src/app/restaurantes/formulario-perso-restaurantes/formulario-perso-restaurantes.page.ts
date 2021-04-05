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
  constructor(private modalController : ModalController, private regimenService:RegimenAlimenticioService, private tcService:TipoComidaService) { }

  ngOnInit() {
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
}
