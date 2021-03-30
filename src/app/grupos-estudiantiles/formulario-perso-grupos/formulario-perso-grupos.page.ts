import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Tematica } from 'src/app/Model/Tematica/tematica';
import { TematicaService } from 'src/app/Model/Tematica/tematica.service';

@Component({
  selector: 'app-formulario-perso-grupos',
  templateUrl: './formulario-perso-grupos.page.html',
  styleUrls: ['./formulario-perso-grupos.page.scss'],
})
export class FormularioPersoGruposPage implements OnInit {

  tematicas: Tematica[]=[];

  constructor(private modalController:ModalController, private tematicasService: TematicaService) { }

  ngOnInit() {
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

}
