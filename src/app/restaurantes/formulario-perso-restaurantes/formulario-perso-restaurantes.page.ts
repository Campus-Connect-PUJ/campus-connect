import { Component, OnInit } from '@angular/core';
import {ModalController, ToastController} from '@ionic/angular';
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

  regimenes : RegimenAlimenticio[]=[];
  comidas: TipoComida[]=[];

  regimenUsuario: RegimenAlimenticio = new RegimenAlimenticio();
  comidasUsuario: TipoComida[]=[];
  nivelExigencia=0;
  ambientacion='';

  usuario: UsuarioGeneral;

  constructor(
    private loginService: LoginService,
    private modalController : ModalController, 
    private regimenService:RegimenAlimenticioService, 
    private tcService:TipoComidaService,
    private usuarioSer: UsuarioGeneralService,
    public toastCtrl: ToastController) {

    this.usuario = this.loginService.getUser();
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

  guardar(){
    console.log("enviar info al back");

    this.usuarioSer.persoRestaurantes(
      this.regimenUsuario.id,
      this.nivelExigencia,
      this.ambientacion,
      this.comidasUsuario.map(i => i.id)
    ).subscribe(
      results => console.log(results),
      error => console.error(error)
    );

    this.usuarioSer.getInfoUsuario().subscribe(
      (result: UsuarioGeneral) => {
        this.usuario = result
        this.loginService.storeUser(this.usuario, this.loginService.getToken())
        console.log("user", this.usuario)
      },
      error => console.error()
    );
    this.presentToast("Tus datos han sido actualizados");
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
