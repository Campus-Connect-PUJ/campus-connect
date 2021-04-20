import { LoginService } from 'src/app/services/login.service';
import { UsuarioGeneralService } from './../Model/UsuarioGeneral/usuario-general.service';
import { NavController, PopoverController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { MonitorDetallesComponent } from './monitor-detalles/monitor-detalles.component';
import { UsuarioGeneral } from '../Model/UsuarioGeneral/usuario-general';
import { MonitoriaService } from '../Model/Monitoria/monitoria.service';

@Component({
  selector: 'app-monitores',
  templateUrl: './monitores.page.html',
  styleUrls: ['./monitores.page.scss'],
})
export class MonitoresPage implements OnInit {
  monitores: Array<UsuarioGeneral> = [];


  constructor(private popoverCtrl:PopoverController, 
    private monService: MonitoriaService,
    public navCtrl: NavController,
    private logService: LoginService
  ) { }

  ngOnInit() {
    this.monService.obtenerMonitores().subscribe(
      result => {
        this.monitores = result;
        console.log("Monitores ",this.monitores)
        console.log(".>", this.monitores[0].monitorDe)
        this.sugerenciasMonitores(this.monitores)
      },
      error => console.log(error)
    )

  }


  async mostrarInfo(indice){
    console.log("Indie", indice)
    const popover = await this.popoverCtrl.create({
      component: MonitorDetallesComponent,
      componentProps: {
        idUsuario: indice
      },
      cssClass: 'popover',
      translucent: true
    }); 

    await popover.present();

    const {data} = await popover.onDidDismiss();
    console.log(data);
    if(data.presionado > 0){
      //this.navCtrl.setDirection("/servicios-academicos")
    }

    this.monService.votarMonitor(268,5).subscribe(
      result => console.log(result),
      error => console.log(error)
    )
  }

  sugerenciasMonitores(monitores){
    let usuarioActual = this.logService.getUser();
    let monitoresOrdenados = monitores

    /*
    monitoresOrdenados.sort(function (a, b) {
      if (a. > b.puntaje) {
        return -1;
      }
      if (a.puntaje < b.puntaje) {
        return 1;
      }
      // a must be equal to b
      return 0;
    });
    */

    return monitoresOrdenados;
  }



}
