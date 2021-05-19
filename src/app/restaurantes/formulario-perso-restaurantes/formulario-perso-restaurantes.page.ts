import { Component, OnInit } from '@angular/core';
import {AlertController, ModalController, ToastController} from '@ionic/angular';
import { RegimenAlimenticio } from 'src/app/Model/RegimenAlimenticio/regimen-alimenticio';
import { RegimenAlimenticioService } from 'src/app/Model/RegimenAlimenticio/regimen-alimenticio.service';
import { TipoComida } from 'src/app/Model/TipoComida/tipo-comida';
import { TipoComidaService } from 'src/app/Model/TipoComida/tipo-comida.service';
import { UsuarioGeneral } from 'src/app/Model/UsuarioGeneral/usuario-general';
import { UsuarioGeneralService } from 'src/app/Model/UsuarioGeneral/usuario-general.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-formulario-perso-restaurantes',
  templateUrl: './formulario-perso-restaurantes.page.html',
  styleUrls: ['./formulario-perso-restaurantes.page.scss'],
})
export class FormularioPersoRestaurantesPage implements OnInit {

  comidaFav: TipoComida[]=[];
  regimenes : RegimenAlimenticio[]=[];
  comidas: TipoComida[]=[];

  regimenUsuario: RegimenAlimenticio = new RegimenAlimenticio();
  comidasUsuario: TipoComida[]=[];
  nivelExigencia=0;
  ambientacion='';

  usuario: UsuarioGeneral = new UsuarioGeneral(" "," ", " ");;

  constructor(
    private loginService: LoginService,
    private modalController : ModalController, 
    private regimenService:RegimenAlimenticioService, 
    private tcService:TipoComidaService,
    private usuarioSer: UsuarioGeneralService,
    public toastCtrl: ToastController,
    public alertController: AlertController) {
    
    try {
      this.usuario = this.loginService.getUser();
      this.comidaFav = this.usuario.comidaFav;
    } catch (error) {
      console.log(error)
    }
    
  }

  ngOnInit() {

    this.findRegimenes();
    this.findComida();
  }

  closeModal(){
    this.modalController.dismiss();
  }

  findRegimenes() {
    this.regimenService.getRegimenAlimenticios().subscribe(
      (results: RegimenAlimenticio[]) => {
        console.log(results);
        this.regimenes = results;
      },
      error => console.error(error)
    )
  }

  findComida() {
    this.tcService.getTipoComida().subscribe(
      (results: TipoComida[]) => {
        console.log(results);
        this.comidas = results;
      },
      error => console.error(error)
    )
  }

  async guardar(){
    if(this.regimenUsuario.id==null){
      await this.alertaElementoNoSeleccionado(
        "Regimen Alimenticio",
        "Para continuar debes seleccionar un regimen alimenticio."
      );
    }else if(this.nivelExigencia===0){
      await this.alertaElementoNoSeleccionado(
        "Regimen Alimenticio",
        "Para continuar debes seleccionar un nivel de exigencia del regimen alimenticio."
      );
    }else if(this.ambientacion===''){
      await this.alertaElementoNoSeleccionado(
        "Ambientación",
        "Para continuar debes seleccionar una ambientación."
      );
    }else if(this.comidasUsuario.length===0){
      await this.alertaElementoNoSeleccionado(
        "Comida",
        "Para continuar debes seleccionar al menos un tipo de comida."
      );
    }else{
      this.usuarioSer.persoRestaurantes(
      this.regimenUsuario.id,
      this.nivelExigencia,
      this.ambientacion,
      this.comidasUsuario.map(i => i.id)
    ).subscribe(
      (result: UsuarioGeneral) => {
        console.log(result)
        this.usuario = result
        this.loginService.storeUser(this.usuario, this.loginService.getToken())
        console.log("user", this.usuario)
        this.closeModal();
      },
      error => console.error(error)
    );

    this.presentToast("Tus datos han sido actualizados");
    }
    
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
