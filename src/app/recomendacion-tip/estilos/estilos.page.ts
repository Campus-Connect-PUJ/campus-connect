import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-estilos',
  templateUrl: './estilos.page.html',
  styleUrls: ['./estilos.page.scss'],
})
export class EstilosPage implements OnInit {

  constructor(private modalController : ModalController ) { }

  ngOnInit() {
  }

  closeModal(){
    this.modalController.dismiss();
  }

}
