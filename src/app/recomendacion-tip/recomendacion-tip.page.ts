import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { TipsService } from 'src/app/Model/Tip/tips.service';
import { Tip } from '../Model/Tip/tip';
import { UsuarioGeneral } from '../Model/UsuarioGeneral/usuario-general';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-recomendacion-tip',
  templateUrl: './recomendacion-tip.page.html',
  styleUrls: ['./recomendacion-tip.page.scss'],
})
export class RecomendacionTipPage implements OnInit {
  tipRecomendado: Tip = new Tip();
  indice: number;
  user: UsuarioGeneral;

  constructor(
    private router: Router,
    private tipsService: TipsService,
    private loginService: LoginService,
    public alertaCtrl: AlertController
  ) { }

  ngOnInit() {
    this.user = this.loginService.obtenerElemento("perso"+this.loginService.getUser().email);
    this.indice = this.loginService.getUser().id;

    try {
      console.log(this.user.estilosAprendizaje.length)
      if(this.user.estilosAprendizaje.length > 0){
        this.obtenerTipRecomendado();
      }
      else{
        this.mostrarAlerta();
      }
    } catch (error) {
      this.mostrarAlerta()
    }

  }


  async mostrarAlerta() {
    const alert = await this.alertaCtrl.create({
      header: '¿Borrar materia?',
      subHeader: 'Materia',
      message: 'Esta apunto de borrar la materia ',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.router.navigate(['/tabs/servicios-academicos']);
          }
        }, {
          text: 'Ir a formulario',
          handler: () => {
            this.router.navigate(['/test-aprendizaje']);
          }
        }
      ]
    })
    await alert.present();
  }



  votar(voto: number){
    console.log(voto);

    this.user = this.loginService.getUser();
    this.indice = this.user.id;
    if(voto == 1){
      this.tipsService.agregarTipGustado(this.indice, this.tipRecomendado.id).subscribe(
        results => {this.obtenerTipRecomendado()},
        error => console.error(error)
      )
      
    }
    else{ 
      this.tipsService.agregarTipNoGustado(this.indice, this.tipRecomendado.id).subscribe(
        results => {this.obtenerTipRecomendado()},
        error => console.error(error)
      )
    }
  }

  obtenerTipRecomendado(){
    
    console.log(this.indice)
    this.tipsService.obtenerRecomendacion(this.indice).subscribe(
      results => {
        this.tipRecomendado = results;
      },
      error => console.error(error)
    )

  }

}
