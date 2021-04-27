import { Component, OnInit } from '@angular/core';
import { GuardsCheckStart } from '@angular/router';
import { Storage } from '@ionic/storage';
import { CalculadoraService } from'../shared/calculadora.service';
import { AlertController, ToastController } from '@ionic/angular';
import { NotasMateria } from 'src/app/Model/Nota/nota';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-materias',
  templateUrl: './materias.page.html',
  styleUrls: ['./materias.page.scss'],
})
export class MateriasPage {
  materias: NotasMateria[];

  constructor(
          private calculadoraService: CalculadoraService,
          public alertaCtrl: AlertController, 
          public toastCtrl: ToastController,
          
  ) {

    this.reload();
  }

  ngOnInit() {
    console.log("Entra en iniciador")
    this.reload();
  }

  ngOnDestroy() {
    console.log("destruyendo");
  }

  async presentToast(){
    const toast = await this.toastCtrl.create(
      {
        message: "Prueba",
        duration: 4000
      }
    );
    toast.present();
  }

  reload() {
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
            this.presentToast();
          }
        }
      ]
    })
    await alert.present();
  }

  doRefresh(event) {
    setTimeout(() => {
      this.reload()
      event.target.complete();
    }, 300);
  }

}


