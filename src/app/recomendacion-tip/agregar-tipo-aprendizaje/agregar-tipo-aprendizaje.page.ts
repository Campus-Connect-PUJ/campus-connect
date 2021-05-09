import { Component, OnInit } from '@angular/core';
import { UsuarioGeneral } from 'src/app/Model/UsuarioGeneral/usuario-general';
import { LoginService } from "src/app/services/login.service";
import { TipoAprendizajeService } from "src/app/Model/TipoAprendizaje/tipo-aprendizaje.service"
import { TipoAprendizaje } from 'src/app/Model/TipoAprendizaje/tipo-aprendizaje';
import { UsuarioGeneralService } from 'src/app/Model/UsuarioGeneral/usuario-general.service'
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-agregar-tipo-aprendizaje',
  templateUrl: './agregar-tipo-aprendizaje.page.html',
  styleUrls: ['./agregar-tipo-aprendizaje.page.scss'],
})
export class AgregarTipoAprendizajePage implements OnInit {
  usuario: UsuarioGeneral;
  aprendizajesExistentes: Array<TipoAprendizaje> = [];
  tiposDeAprendizajeSeleccionados = [];
  tiposDeAprendizajeUsuario = [];

  constructor(
    private loginService: LoginService,
    private tipoAprendizajeService: TipoAprendizajeService,
    private usuarioService: UsuarioGeneralService,
    public alertaCtrl: AlertController
  ) {
    this.usuario = this.loginService.getUser();
  }

  ngOnInit() {
    this.obtenerTiposDeAprendizajeUsuario();
    this.obtenerTiposDeAprendizaje();
  }

  obtenerTiposDeAprendizajeUsuario(){
    try {
      if (!this.usuario.estilosAprendizaje){
        this.usuarioService.getUsuario().subscribe(
          results => {
            this.usuario = results;
            this.tiposDeAprendizajeUsuario = this.usuario.estilosAprendizaje;
          }, error => console.error(error)
        )
      } else {
        this.tiposDeAprendizajeUsuario = this.usuario.estilosAprendizaje;
      }
    } catch (error) {
      console.error(error)
    }


  }

  obtenerTiposDeAprendizaje(){
    this.tipoAprendizajeService.getTiposAprendizaje().subscribe(
      results => {
        this.aprendizajesExistentes = results;
      }, error =>console.error(error)
    )
  }

  
  agregarTipo(){
    const mensaje = "Se publico el foro";
    // TODO: quitar esto, ya que se estara sacando el usuario de la BD
    this.usuario = this.loginService.getUser();
    for(let i = 0; i < this.tiposDeAprendizajeSeleccionados.length; i++){
      this.tipoAprendizajeService.agregarTipoAprendizaje(this.tiposDeAprendizajeSeleccionados[i]).subscribe(
        (results: UsuarioGeneral) => {
          this.usuario = results;
          this.loginService.storeUser(this.usuario, this.loginService.getToken())
        },
        error => console.error(error)
      )

      for(let j=0; j< this.aprendizajesExistentes.length; j++){


        if(this.aprendizajesExistentes[j].id === this.tiposDeAprendizajeSeleccionados[i]){
          if(!this.tiposDeAprendizajeUsuario.includes(this.aprendizajesExistentes[j])){
            this.tiposDeAprendizajeUsuario.push(this.aprendizajesExistentes[j]);
          }
          
        }
      }

    }

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
            this.tipoAprendizajeService.borrarTipoAprendizaje(this.tiposDeAprendizajeUsuario[indice].id).subscribe(
              (result: UsuarioGeneral) => {
                this.usuario = result;
                this.loginService.storeUser(this.usuario, this.loginService.getToken())
              },
              error => console.log(error)
            )
            this.tiposDeAprendizajeUsuario.splice(indice,1);
          }
        }
      ]
    })
    await alert.present();
  }

}
