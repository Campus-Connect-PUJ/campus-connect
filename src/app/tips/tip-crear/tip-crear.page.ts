import { Component, OnInit } from '@angular/core';
import { Tip } from 'src/app/Model/Tip/tip';
import { TipsService } from 'src/app/Model/Tip/tips.service';
import { TipoAprendizaje } from 'src/app/Model/TipoAprendizaje/tipo-aprendizaje';
import { TipoAprendizajeService } from 'src/app/Model/TipoAprendizaje/tipo-aprendizaje.service';
import { UsuarioGeneral } from 'src/app/Model/UsuarioGeneral/usuario-general';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { EstilosPage } from 'src/app/recomendacion-tip/estilos/estilos.page';

@Component({
  selector: 'app-tip-crear',
  templateUrl: './tip-crear.page.html',
  styleUrls: ['./tip-crear.page.scss'],
})
export class TipCrearPage implements OnInit {
  usuario: UsuarioGeneral;
  descripcion: string;
  tipoDeAprendizaje: Array<TipoAprendizaje>= [new TipoAprendizaje()];
  aprendizajesExistentes: Array<TipoAprendizaje> = [];
  tip: Tip = new Tip();
  nivelDeExigencia: Array<Number> = [1,2,3]


  nivelDeExigenciaSeleccionado: number;
  tiposDeAprendizajeSeleccionados: Array<TipoAprendizaje> = [];
  constructor(private tipsService: TipsService, 
    private tipoAprendizajeService: TipoAprendizajeService,
    public toastCtrl: ToastController,
    private loginService: LoginService,
    public alertController: AlertController,
    private router: Router,
    private modalControler : ModalController
    ) { }

  ngOnInit() {
    this.obtenerTiposDeAprendizaje();
  }

  obtenerTiposDeAprendizaje(){
    this.tipoAprendizajeService.getTiposAprendizaje().subscribe(
      results => {
        this.aprendizajesExistentes = results;
      }, error =>console.error(error)
    )
  }

  async crearTip(){
    let mensaje = "Se publico el tip";

    if(this.descripcion==null){
      await this.alertaElementoNoSeleccionado(
        "Descripción",
        "Para continuar debe escribir el tip"
      );
    }
    /*
    else if(this.tiposDeAprendizajeSeleccionados.length === 0){
      await this.alertaElementoNoSeleccionado(
        "Tipo de aprendizaje",
        "Para continuar debes seleccionar al menos un tipo de aprendizaje"
      );
      }*/
    else if(this.nivelDeExigenciaSeleccionado === 0){
      await this.alertaElementoNoSeleccionado(
        "nivel de exigencia",
        "Para continuar debes seleccionar un nivel de exigencia"
      );
    }
    else{
      this.usuario = this.loginService.getUser();
      this.tip.descripcion = this.descripcion;
      this.tip.usuario = this.usuario;
      this.tip.tiposAprendizaje = this.tiposDeAprendizajeSeleccionados;
      this.tip.nivelExigencia = this.nivelDeExigenciaSeleccionado;

      if(this.tiposDeAprendizajeSeleccionados.length === 0){
        this.tiposDeAprendizajeUsuario();
      }

      this.tipsService.createTip(this.tip)
        .subscribe(
          results => {
            console.log(results)
            this.router.navigate(['/tips'
            // '/tabs/servicios-academicos'
            ]);
            this.presentToast(mensaje);
          },
          error => console.error(error)
        )
      
    }

  }

  tiposDeAprendizajeUsuario(){
    let tiposUsuario = [];
    console.log(this.usuario)
    for(let i=0; i<this.usuario.estilosAprendizaje.length; i++){
      tiposUsuario.push(this.usuario.estilosAprendizaje[i].id)
    }

    this.tip.tiposAprendizaje = tiposUsuario;
    console.log(this.tip.tiposAprendizaje)
  }

  openModal(){
    this.modalControler.create({component : EstilosPage}).then((modalElement)=>{
      modalElement.present();
    });
  }


  async presentToast(mensaje){
    const toast = await this.toastCtrl.create(
      {
        message: mensaje,
        duration: 4000
      }
    );
    toast.present();
  }

  async alertaElementoNoSeleccionado(elemento: string, mensaje: string) {
    const alert = await this.alertController.create({
      cssClass: "custom-class-alert",
      header: "Error",
      subHeader: elemento,
      message: mensaje,
      buttons: ["OK"],
    });
    await alert.present();
  }

}
