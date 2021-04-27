import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
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


  constructor(
    private tipsService: TipsService,
    private activatedRoute: ActivatedRoute,
    public alertaCtrl: AlertController,
    private loginService: LoginService
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paraMap => {
      const recipeId = paraMap.get('usuarioId')
      if(recipeId != null){
        console.log(recipeId)
        this.cargarTipsUsuarios(Number(recipeId));
        this.usuario = this.loginService.getUser();
      }
    })
  }

  cargarTipsUsuarios(idUsuario: number){
    let tipsUsuario = new Array<Tip>();
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
            console.log(this.tips)
            console.log("Indice ", indice)
            this.tipsService.borrarTip(this.usuario.id, this.tips[indice].id).subscribe(
              result => console.log(result),
              error => console.log(error)
            )

            this.tips.splice(indice,1);
            this.loginService.guardarElemento("perso"+this.loginService.getUser().email, this.usuario);
            
          }
        }
      ]
    })
    await alert.present();
  }
}