import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
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

  tematicas: Tematica[]=[];
  caracteristicas: Caracteristica[]=[];
  actividades: actividad[] = [];
  hobbies: actividad[] = [];

  tematicasUsuario: Tematica[]=[];
  caracteristicasUsuario: Caracteristica[]=[];

  usuario: UsuarioGeneral;

  textoBuscar='';

  constructor(
    private loginService: LoginService,
    private modalController:ModalController, 
    private tematicasService: TematicaService, 
    private caracteristicaService: CaracteristicaService,
    private usuarioSer: UsuarioGeneralService,
    public toastCtrl: ToastController) {
    this.usuario = this.loginService.getUser();

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
    console.log(this.actividades)
  }

  masHobbies(){
    this.hobbies.push(new actividad(" "));
    console.log(this.hobbies)
  }

  guardar(){
    console.log("Enviar datos al back");

    this.usuarioSer.persoGrupos(
      this.caracteristicasUsuario.map(i => i.id),
      this.actividades.map(i => i.nombre),
      this.hobbies.map(i => i.nombre)
    ).subscribe(
      (result: UsuarioGeneral) => {
        this.usuario = result
        this.loginService.storeUser(this.usuario, this.loginService.getToken())
        console.log("user", this.usuario)
      },
      error => console.error(error)
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

  buscarCaracteristica(event){
    const texto = event.target.value;
    this.textoBuscar= texto;
  }
}
