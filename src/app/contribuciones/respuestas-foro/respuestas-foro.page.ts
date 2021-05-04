import { RespuestasForoService } from '../../Model/RespuestasForo/respuestas-foro.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RespuestaForo } from '../../Model/RespuestasForo/respuestas-foro';
import { AlertController } from '@ionic/angular';
import { UsuarioGeneral } from 'src/app/Model/UsuarioGeneral/usuario-general';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-respuestas-foro',
  templateUrl: './respuestas-foro.page.html',
  styleUrls: ['./respuestas-foro.page.scss'],
})
export class RespuestasForoPage implements OnInit {
  respuestasUsuario: Array<RespuestaForo> = [];
  usuario: UsuarioGeneral;

  constructor(
    private activatedRoute: ActivatedRoute,
    private respService: RespuestasForoService,
    public alertaCtrl: AlertController,
    private loginService: LoginService
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paraMap => {
      const recipeId = paraMap.get('usuarioId')
      if(recipeId != null){
        console.log(recipeId)
        this.respService.getRespuestasForoById(+recipeId).subscribe(
          result => {
            this.respuestasUsuario = result
            console.log("Las respuestas", this.respuestasUsuario)
            this.usuario = this.loginService.getUser();
          },
          error => console.log(error)
        );
        //this.cargarTipsUsuarios(Number(recipeId));
      }
      else{
        //this.cargarTips();
      }
    })
  }

  async presentAlert(indice){
    const alert = await this.alertaCtrl.create({
      header: '¿Borrar respuesta foro?',
      subHeader: 'Respuesta foro '+ (indice+1),
      message: 'Esta apunto de borrar la respuesta '+ (indice+1),
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
            console.log(this.respuestasUsuario)
            console.log("Indice ", indice)
            this.respService.borrarRespuesta(this.respuestasUsuario[indice].id).subscribe(
              result => console.log(result),
              error => console.log(error)
            )
            this.respuestasUsuario.splice(indice,1);

            // esto no creo que sea necesario
            this.loginService.storeUser(this.usuario, this.loginService.getToken())

          }
        }
      ]
    })
    await alert.present();
  }

}
