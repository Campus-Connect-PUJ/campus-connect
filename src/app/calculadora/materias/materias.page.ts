import { Component, OnInit } from '@angular/core';
import { GuardsCheckStart } from '@angular/router';
import { Storage } from '@ionic/storage';
import { CalculadoraService } from'../calculadora.service';
import { NotasMateria } from '../notas.model';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-materias',
  templateUrl: './materias.page.html',
  styleUrls: ['./materias.page.scss'],
})
export class MateriasPage {
  materias: Array<NotasMateria>;

  constructor(private calculadoraService: CalculadoraService, public alertaCtrl: AlertController) { 

    console.log("Entra en constructor", this.materias)
    this.materias = this.calculadoraService.load();
    this.materias = this.calculadoraService.load();
  }

  ngOnInit() {
    console.log("Entra en iniciador")
    this.materias = this.calculadoraService.load();
    this.materias = this.calculadoraService.load();
  }


  async presentAlert(indice){
    const alert = await this.alertaCtrl.create({
      header: '¿Borrar materia?',
      subHeader: 'Materia'+ (indice+1),
      message: 'Esta apunto de borrar la materia '+ (indice+1),
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Borrar',
          handler: () => {
            this.materias.splice(indice,1)
            this.calculadoraService.guardarMaterias(this.materias);
          }
        }
      ]
    })
    await alert.present();
  }
}


