import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Tematica } from 'src/app/Model/Tematica/tematica';
import { TematicaService } from 'src/app/Model/Tematica/tematica.service';


export class actividad{
  nombre: String;
}

@Component({
  selector: 'app-formulario-perso-grupos',
  templateUrl: './formulario-perso-grupos.page.html',
  styleUrls: ['./formulario-perso-grupos.page.scss'],
})

export class FormularioPersoGruposPage implements OnInit {

  tematicas: Tematica[]=[];
  actividades: Array<actividad> = [ {nombre: "algo"}];
  hobbies: Array<actividad> = [ {nombre: "algo"}];


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

  masActividad(){
    this.actividades.push(new actividad());
    console.log(this.actividades)
  }

  masHobbies(){
    this.hobbies.push(new actividad());
    console.log(this.hobbies)
  }
}
