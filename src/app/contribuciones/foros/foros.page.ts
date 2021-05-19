import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Foro } from 'src/app/Model/Foro/foro';
import { ForoService } from 'src/app/Model/Foro/foro.service';
import { UsuarioGeneral } from 'src/app/Model/UsuarioGeneral/usuario-general';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-foros',
  templateUrl: './foros.page.html',
  styleUrls: ['./foros.page.scss'],
})
export class ForosPage implements OnInit {
  forosUsuario: Foro[] = [];
  usuario: UsuarioGeneral;
  textoBuscar='';

  id: number;

  constructor(
    private forosService: ForoService,
    private activatedRoute: ActivatedRoute,
    public alertaCtrl: AlertController,
    private loginService: LoginService
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paraMap => {
      this.id = +paraMap.get('usuarioId')
      if(this.id != null){
        this.cargarForosUsuarios(this.id);
        this.usuario = this.loginService.getUser();
      }
    })
  }

  cargarForosUsuarios(id: number){
    let forosUsuario = new Array<Foro>();
    this.forosService.getPosts().subscribe(
      results => {
        this.forosUsuario = results;
        for(let i=0; i<this.forosUsuario.length; i++){
          if(this.forosUsuario[i].usuario.id === id){
            forosUsuario.push(this.forosUsuario[i]);
          }
        }
        this.forosUsuario = forosUsuario;
        console.log(this.forosUsuario)
      },
      error => console.error(error)
    )
  }

   
  async presentAlert(indice){
    const alert = await this.alertaCtrl.create({
      header: '¿Borrar foro?',
      subHeader: 'Foro '+ (indice+1),
      message: 'Esta apunto de borrar el foro '+ (indice+1) + ' con sus respectivas respuestas',
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

            this.forosService.borrarForo(this.forosUsuario[indice].id).subscribe(
              result => console.log(result),
              error => console.log(error)
            )

            this.forosUsuario.splice(indice,1);

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
    this.cargarForosUsuarios(this.id)
  }

}
