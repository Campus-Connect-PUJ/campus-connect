import { Component, OnInit } from '@angular/core';
import { Foro } from 'src/app/Model/Foro/foro';
import { ForoService } from 'src/app/Model/Foro/foro.service';
import { UsuarioGeneral } from 'src/app/Model/UsuarioGeneral/usuario-general';
import { AlertController, ToastController } from '@ionic/angular';
import { LoginService } from "src/app/services/login.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-foro-crear',
  templateUrl: './foro-crear.page.html',
  styleUrls: ['./foro-crear.page.scss'],
})
export class ForoCrearPage implements OnInit {
  id: number;
  fecha: Date;
  titulo: string;
  descripcion: string;
  reportado: boolean;

  usuario: UsuarioGeneral;
  foroCreado: Foro = new Foro("", "", null);
  constructor(
    private foroService: ForoService,
    public toastCtrl: ToastController,
    private loginService: LoginService,
    public alertController: AlertController,
    private router: Router
    ) { }

  ngOnInit() {
  }

  async crearForo(){
    let mensaje = "Se publico el foro";
    // TODO: quitar esto, ya que se estara sacando el usuario de la BD

    if(this.titulo==null){
      await this.alertaElementoNoSeleccionado(
        "Titulo",
        "Para continuar debe escribir el titulo"
      );
    }
    else if(this.descripcion == null){
      await this.alertaElementoNoSeleccionado(
        "Descipción",
        "Para continuar debes escribir la descripción"
      );
    }

    else if(this.titulo.length>=50){
      await this.alertaElementoNoSeleccionado(
        "Titulo",
        "Titulo demasiado extenso (max 50)"
      );
    }
    else{
      this.usuario = this.loginService.getUser();

      console.log(this.descripcion, this.titulo)
      this.foroCreado.titulo = this.titulo;
      this.foroCreado.descripcion = this.descripcion;
      // this.postCreado.fecha = new Date("2018-03-16");
      this.foroCreado.usuario = this.usuario;
      
      console.log(this.foroCreado)
      this.foroService.createPost(this.foroCreado)
        .subscribe(
          results => {
            console.log(results)            
            this.router.navigate(['/tabs/servicios-academicos'
            // '/tabs/servicios-academicos'
            ]);
            this.presentToast(mensaje)
          },
          error => console.error(error)
        )
    }
  }

  async presentToast(mensaje){
    const toast = await this.toastCtrl.create(
      {
        message: mensaje,
        duration: 1500
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
