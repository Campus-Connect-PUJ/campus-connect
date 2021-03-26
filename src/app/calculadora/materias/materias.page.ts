import { Component, OnInit } from '@angular/core';
import { GuardsCheckStart } from '@angular/router';
import { Storage } from '@ionic/storage';
import { CalculadoraService } from'../shared/calculadora.service';
import { NotasMateria } from '../../Model/Nota.model';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-materias',
  templateUrl: './materias.page.html',
  styleUrls: ['./materias.page.scss'],
})
export class MateriasPage {
  materias: NotasMateria[];

  constructor(
    private calculadoraService: CalculadoraService,
    public alertaCtrl: AlertController
  ) {

    console.log("Entra en constructor", this.materias)
    this.reload();
  }

  ngOnInit() {
    console.log("Entra en iniciador")
    this.reload();
  }

  ngOnDestroy() {
    console.log("destruyendo");
  }

  reload() {
    this.materias = this.calculadoraService.load();
    // window.location.replace('/calculadora/materias')
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


