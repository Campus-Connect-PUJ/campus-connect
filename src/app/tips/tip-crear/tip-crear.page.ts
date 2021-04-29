import { Component, OnInit } from '@angular/core';
import { Tip } from 'src/app/Model/Tip/tip';
import { TipsService } from 'src/app/Model/Tip/tips.service';
import { TipoAprendizaje } from 'src/app/Model/TipoAprendizaje/tipo-aprendizaje';
import { TipoAprendizajeService } from 'src/app/Model/TipoAprendizaje/tipo-aprendizaje.service';
import { UsuarioGeneral } from 'src/app/Model/UsuarioGeneral/usuario-general';
import { ToastController } from '@ionic/angular';
import { LoginService } from 'src/app/services/login.service';

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


  nivelDeExigenciaSelecionado = [];
  tiposDeAprendizajeSeleccionados = [];
  constructor(private tipsService: TipsService, 
    private tipoAprendizajeService: TipoAprendizajeService,
    public toastCtrl: ToastController,
    private loginService: LoginService
    ) { }

  ngOnInit() {
    this.obtenerTiposDeAprendizaje();
  }

  obtenerTiposDeAprendizaje(){
    this.tipoAprendizajeService.getTiposAprendizaje().subscribe(
      results => {
        this.aprendizajesExistentes = results;
        console.log(this.aprendizajesExistentes)
      }, error =>console.error(error)
    )
  }

  crearTip(){
    let mensaje = "Se publico el tip";
    // TODO: quitar esto, ya que se estara sacando el usuario de la BD


    this.usuario = this.loginService.getUser();

    this.tip.descripcion = this.descripcion;
    this.tip.usuario = this.usuario;
    this.tip.tiposAprendizaje = this.tiposDeAprendizajeSeleccionados;
    this.tip.nivelExigencia = 3;


    this.tipsService.createTip(this.tip)
      .subscribe(
        results => console.log(results),
        error => console.error(error)
      )
    this.presentToast(mensaje);
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

}
