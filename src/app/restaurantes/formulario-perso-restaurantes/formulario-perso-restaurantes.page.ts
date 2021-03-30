import { Component, OnInit } from '@angular/core';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-formulario-perso-restaurantes',
  templateUrl: './formulario-perso-restaurantes.page.html',
  styleUrls: ['./formulario-perso-restaurantes.page.scss'],
})
export class FormularioPersoRestaurantesPage implements OnInit {

  constructor(private modalController : ModalController) { }

  ngOnInit() {
  }

  closeModal(){
    this.modalController.dismiss();
  }
}
