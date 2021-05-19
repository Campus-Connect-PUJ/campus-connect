import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { Caracteristica } from 'src/app/Model/Caracteristica/caracteristica';
import { CaracteristicaService } from 'src/app/Model/Caracteristica/caracteristica.service';
import { Tematica } from 'src/app/Model/Tematica/tematica';
import { TematicaService } from 'src/app/Model/Tematica/tematica.service';
import { UsuarioGeneral } from 'src/app/Model/UsuarioGeneral/usuario-general';
import { UsuarioGeneralService } from 'src/app/Model/UsuarioGeneral/usuario-general.service';
import { LoginService } from 'src/app/services/login.service';


export class actividad{
  nombre: string;
  constructor(n){
    this.nombre = n;
  }
}

@Component({
  selector: 'app-formulario-perso-grupos',
  templateUrl: './formulario-perso-grupos.page.html',
  styleUrls: ['./formulario-perso-grupos.page.scss'],
})

export class FormularioPersoGruposPage implements OnInit {

  caracteristicasDeUsuario: Caracteristica[] = [];
  tematicas: Tematica[]=[];
  caracteristicas: Caracteristica[]=[];
  actividades: actividad[] = [];
  hobbies: actividad[] = [];

  tematicasUsuario: Tematica[]=[];
  caracteristicasUsuario: Caracteristica[]=[];

  usuario: UsuarioGeneral = new UsuarioGeneral(" "," ", " ");

  textoBuscar='';

  constructor(
    private loginService: LoginService,
    private modalController:ModalController, 
    private tematicasService: TematicaService, 
    private caracteristicaService: CaracteristicaService,
    private usuarioSer: UsuarioGeneralService,
    public toastCtrl: ToastController,
    public alertController: AlertController) {
    
    try {
      this.usuario = this.loginService.getUser();
      this.caracteristicasDeUsuario = this.usuario.caracteristicas;
    } catch (error) {
      console.log(error)
    }
    
  }

  ngOnInit() {
    this.findTematica();
    this.findCaracteristica(); 
  }

  closeModal(){
    this.modalController.dismiss();
  }

  findTematica() {
    this.tematicasService.getTematicas().subscribe(
      (results: Tematica[]) => {
        console.log(results);
        this.tematicas = results;
      },
      error => console.error(error)
    )
  }

  findCaracteristica(){
    this.caracteristicaService.getCaracteristicas().subscribe(
      (results: Caracteristica[]) => {
        console.log(results);
        this.caracteristicas = results;
      },
      error => console.error(error)
    )
  }

  masActividad(){
    this.actividades.push(new actividad(" "));

  }

  masHobbies(){
    this.hobbies.push(new actividad(" "));

  }

  async guardar(){


    if(this.caracteristicasUsuario.length===0){
      await this.alertaElementoNoSeleccionado(
        "Caracteristicas",
        "Para continuar debes seleccionar al menos una caracteristica."
      );

    } else if(this.actividades.length===0){
      await this.alertaElementoNoSeleccionado(
        "Actividades",
        "Para continuar debes ingresar al menos una actividad."
      );
    }else if(this.hobbies.length===0){
      await this.alertaElementoNoSeleccionado(
        "Hobbies",
        "Para continuar debes ingresar al menos un hobbie."
      );
    } else{
      this.usuarioSer.persoGrupos(
      this.caracteristicasUsuario.map(i => i.id),
      this.actividades.map(i => i.nombre),
      this.hobbies.map(i => i.nombre)
    ).subscribe(
      (result: UsuarioGeneral) => {
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

  buscarCaracteristica(event){
    const texto = event.target.value;
    this.textoBuscar= texto;
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
