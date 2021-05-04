import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Tip } from 'src/app/Model/Tip/tip';
import { TipsService } from 'src/app/Model/Tip/tips.service';
import { UsuarioGeneral } from 'src/app/Model/UsuarioGeneral/usuario-general';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-tips',
  templateUrl: './tips.page.html',
  styleUrls: ['./tips.page.scss'],
})
export class TipsPage implements OnInit {
  tips: Tip[] = [];
  usuario: UsuarioGeneral;
  textoBuscar='';

  id: number;

  constructor(
    private tipsService: TipsService,
    private activatedRoute: ActivatedRoute,
    public alertaCtrl: AlertController,
    private loginService: LoginService
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paraMap => {
      this.id = +paraMap.get('usuarioId')
      if(this.id != null){
        console.log(this.id)
        this.cargarTipsUsuarios(this.id);
        this.usuario = this.loginService.getUser();
      }
    })
  }

  cargarTipsUsuarios(idUsuario: number){
    const tipsUsuario = new Array<Tip>();
    this.tipsService.getTips().subscribe(
      results => {
        this.tips = results;
        for(let i=0; i<this.tips.length; i++){
          console.log(".>", this.tips[i])
          if(this.tips[i].idUsuarioCreador === idUsuario){
            tipsUsuario.push(this.tips[i]);
          }
        }
        this.tips = tipsUsuario;
        console.log("Los tips", this.tips)
      },
      error => console.error(error)
    )

  }

  async presentAlert(indice){
    const alert = await this.alertaCtrl.create({
      header: '¿Borrar tip?',
      subHeader: 'Tip '+ (indice+1),
      message: 'Esta apunto de borrar el tip '+ (indice+1),
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
            console.log(this.tips)
            console.log("Indice ", indice)
            this.tipsService.borrarTip(this.tips[indice].id).subscribe(
              result => console.log(result),
              error => console.log(error)
            )

            this.tips.splice(indice,1);

            // esto no creo que sea necesario
            this.loginService.storeUser(this.usuario, this.loginService.getToken())
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

  reload() {
    this.cargarTipsUsuarios(this.id)
  }
}
